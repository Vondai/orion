using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrionApi.Models;
using OrionApi.Models.User;
using OrionApi.Services.Users;

namespace OrionApi.Controllers
{
    [Route("orion.api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUsersService usersService;

        public UserController(IUsersService usersService)
        {
            this.usersService = usersService;
        }

        [HttpPost]
        [Route("signup")]
        [AllowAnonymous]
        public async Task<IActionResult> SignUp(AuthModel model)
        {
            var result = await usersService.SignUpUser(model.Username, model.Password);
            if (!result.Succeeded)
            {
                return BadRequest(new ResponseMessage("User already exists."));
            }
            var token = await usersService.SignInUser(model.Username, model.Password);
            return Ok(new { model.Username, token });

        }

        [HttpPost]
        [Route("signin")]
        [AllowAnonymous]
        public async Task<IActionResult> SignIn(AuthModel model)
        {
            var token = await usersService.SignInUser(model.Username, model.Password);

            if (token == null)
            {
                return BadRequest(new ResponseMessage("Invalid username or password."));
            }
            return Ok(new { model.Username, token });
        }
    }
}
