using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace OrionApi.Services.Users
{
    public interface IUsersService
    {
        public Task<IdentityResult> SignUpUser(string username, string password);

        public Task<string> SignInUser(string username, string password);
    }
}
