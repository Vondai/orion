using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using OrionApi.Data.Models;

namespace OrionApi.Services.Users
{
    public class UsersService : IUsersService
    {
        private readonly UserManager<User> userManager;
        private readonly IConfiguration configuration;

        public UsersService(UserManager<User> userManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.configuration = configuration;
        }

        public async Task<IdentityResult> RegisterUser(string username, string password)
        {
            var user = new User()
            {
                UserName = username
            };

            return await userManager.CreateAsync(user, password);
        }

        public async Task<string> LoginUser(string username, string password)
        {
            var user = await userManager.FindByNameAsync(username);
            if (user != null && await userManager.CheckPasswordAsync(user, password))
            {
                var userClaims = new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Name, user.UserName)
                };

                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var securityToken = new JwtSecurityToken(configuration["Jwt:Issuer"],
                    configuration["Jwt:Audience"],
                    userClaims,
                    expires: DateTime.Now.AddHours(1),
                    signingCredentials: credentials
                    );

               var token = new JwtSecurityTokenHandler().WriteToken(securityToken);

               return token;
            }

            return null;
        }
    }
}
