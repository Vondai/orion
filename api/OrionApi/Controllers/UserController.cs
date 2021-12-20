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
                return StatusCode(StatusCodes.Status500InternalServerError,
                       new Response { Status = "Error", Message = "Username already exists." });
            }

            return Ok(new Response { Status = "Success", Message = "User created successfully." });
        }

        [HttpPost]
        [Route("signin")]
        [AllowAnonymous]
        public async Task<IActionResult> SignIn(AuthModel model)
        {
            var token = await usersService.SignInUser(model.Username, model.Password);

            if (token == null)
            {
                return NotFound(new Response { Status = "Error", Message = "Invalid username or password." });
            }
            return Ok(new { model.Username, token });
        }
    }
}
