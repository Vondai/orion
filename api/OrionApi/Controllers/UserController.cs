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
        [Route("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(AuthModel model)
        {
            var result = await usersService.RegisterUser(model.Username, model.Password);
            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                       new Response { Status = "Error", Message = "Username already exists." });
            }

            return Ok(new Response { Status = "Success", Message = "User created successfully."});
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(AuthModel model)
        {
            var token = await usersService.LoginUser(model.Username, model.Password);

            if (token == null)
            {
                 return NotFound(new Response { Status = "Not Found", Message = "User not found" });
            }

            return Ok(new { model.Username, token });
        }
    }
}
