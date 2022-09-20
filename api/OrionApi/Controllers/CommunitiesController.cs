using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrionApi.Infrastructure;
using OrionApi.Models;
using OrionApi.Models.Communities;
using OrionApi.Services.Communities;

namespace OrionApi.Controllers
{
    [Route("orion.api/[controller]")]
    [ApiController]
    public class CommunitiesController : ControllerBase
    {
        private readonly ICommunityService communityService;

        public CommunitiesController(ICommunityService communityService)
        {
            this.communityService = communityService;
        }

        [Route("create")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(CommunityCreateModel model)
        {
            var userId = this.User.Id();
            var response = new Response();
            try
            {
                var communityId = await communityService.Create(model.Title, model.Description, userId);
                response.Status = "Success";
                response.Message = communityId;
                return StatusCode(StatusCodes.Status201Created, response);
            }
            catch (InvalidOperationException e)
            {
                response.Status = "Error";
                response.Message = e.Message;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("top")]
        public IActionResult GetTop()
        {
            var topCommunities = communityService.GetTop();
            return Ok(topCommunities);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("{communityName}")]
        public IActionResult Get(string communityName)
        {
            var userId = this.User.Id();
            var community = communityService.Get(communityName, userId);
            if (community == null)
            {
                return NotFound();
            }

            return Ok(community);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Manage([FromBody] ManageCommunityRequestBody requestBody)
        {
            var userId = this.User.Id();
            try
            {
                string result = "";
                if (requestBody.Action == "join")
                {
                    result = await communityService.Join(requestBody.CommunityName, userId);
                }
                return Ok(new ResponseMessage(result));
            }
            catch (InvalidOperationException e)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new ResponseMessage(e.Message));
            }
        }
    }
}
