using System.Security.Claims;

namespace OrionApi.Infrastructure
{
    public static class ClaimsPrincipalExtensions
    {
        public static string Id(this ClaimsPrincipal user)
            => user.FindFirstValue(ClaimTypes.NameIdentifier);

        public static string Name(this ClaimsPrincipal user)
            => user.FindFirstValue(ClaimTypes.Name);
    }
}
