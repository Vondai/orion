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
    public class CommunityController : ControllerBase
    {
        private readonly ICommunityService communityService;

        public CommunityController(ICommunityService communityService)
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
        [Route("listing/top")]
        public IActionResult GetTop()
        {
            var topCommunities = communityService.GetTop();
            return Ok(topCommunities);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("{name}")]
        public IActionResult GetDetails(string name)
        {
            var userId = this.User.Id();
            var communityDetails = communityService.GetDetails(name, userId);
            if (communityDetails == null)
            {
                return NotFound(new Response { Status = "Not Found", Message = "Community does not exist." });
            }

            return Ok(communityDetails);
        }
    }
}
