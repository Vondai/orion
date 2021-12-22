using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
    public class PostController : ControllerBase
    {
        private readonly ICommunityService communityService;
        private readonly IPostService postService;

        public PostController(IPostService postService, ICommunityService communityService)
        {
            this.postService = postService;
            this.communityService = communityService;
        }

        [HttpPost]
        [Authorize]
        [Route("create")]
        public async Task <IActionResult> Create(PostCreateModel model)
        {
            var userId = this.User.Id();
            var isMember = communityService.IsMember(model.Community, userId);
            if (!isMember)
            {
                return Unauthorized(new Response { Status = "Error", Message = "User is not a member." });
            }
            var communityId = communityService.GetId(model.Community);
            var postId = await postService.Create(model.Title, model.Content, communityId, userId);

            return Created($"/community/{model.Community}/{postId}", postId);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("{id}")]
        public IActionResult Get(string id)
        {

            return Ok();
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("all")]
        public IActionResult GetAll()
        {
            var posts = postService.GetAll();
            return Ok(posts);
        }
    }
}
