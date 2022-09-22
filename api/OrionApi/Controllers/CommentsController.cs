using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrionApi.Infrastructure;
using OrionApi.Models;
using OrionApi.Models.Comment;
using OrionApi.Services.Comments;
using OrionApi.Services.Communities;
using OrionApi.Services.Posts;
using System.Threading.Tasks;

namespace OrionApi.Controllers
{
    [Route("orion.api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService commentService;
        private readonly IPostService postService;

        public CommentsController(
            ICommentService commentService,
            IPostService postService)
        {
            this.commentService = commentService;
            this.postService = postService;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(CommentCreateModel model)
        {
            var userId = this.User.Id();
            var response = new ResponseMessage("");
            if (model.Comment.Length < 1)
            {
                response.Message = "Comment is empty.";
                return StatusCode(StatusCodes.Status400BadRequest, response);
            }
            var isPostValid = postService.IsValidById(model.PostId);
            if (!isPostValid)
            {
                response.Message = "Invalid post";
                return StatusCode(StatusCodes.Status400BadRequest, response);
            }
            var communityId = postService.GetCommunityId(model.PostId);
            var comment = await commentService.Create(model.Comment, model.PostId, communityId, userId);

            return StatusCode(StatusCodes.Status201Created, new {commentId= comment });
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("{postId}")]
        public IActionResult GetByPostId(string postId)
        {
            var exists = postService.IsValidById(postId);
            var response = new Response();
            if (!exists)
            {
                response.Status = "Error";
                response.Message = "Post does not exist.";
                return StatusCode(StatusCodes.Status400BadRequest, response);
            }
            var comments = commentService.Get(postId);
            return Ok(comments);
        }
    }
}
