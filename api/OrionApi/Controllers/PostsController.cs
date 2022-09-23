using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrionApi.Infrastructure;
using OrionApi.Models;
using OrionApi.Models.Post;
using OrionApi.Services.Communities;
using OrionApi.Services.Posts;

namespace OrionApi.Controllers
{
    [Route("orion.api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly ICommunityService communityService;
        private readonly IPostService postService;

        public PostsController(IPostService postService, ICommunityService communityService)
        {
            this.postService = postService;
            this.communityService = communityService;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetTrending()
        {
            var posts = postService.GetAll();
            return Ok(posts);
        }

        [HttpPost]
        [Authorize]
        public async Task <IActionResult> Create(PostCreateModel model)
        {
            var userId = this.User.Id();
            var isMember = communityService.IsMember(model.CommunityName, userId);
            if (!isMember)
            {
                return Unauthorized(new Response { Status = "Error", Message = "User is not a member." });
            }
            var communityId = communityService.GetId(model.CommunityName);
            var postId = await postService.Create(model.Title, model.Content, communityId, userId);

            return StatusCode(201, new { postId });
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("get/{communityName}")]
        public IActionResult GetByCommunity(string communityName)
        {
            var posts = postService.GetByCommunity(communityName);
            return Ok(posts);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("{postId}")]
        public IActionResult GetById(string postId, [FromQuery(Name ="sort")] string sort)
        {
            var post = postService.GetById(postId, sort);
            if (post == null)
            {
                return NotFound(new Response { Status = "Error", Message = "Post is locked or deleted." });
            }
            return Ok(post);
        }
    }
}
