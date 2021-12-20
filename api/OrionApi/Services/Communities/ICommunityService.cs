using OrionApi.Models.Communities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrionApi.Services.Communities
{
    public interface ICommunityService
    {
        public Task<string> Create(string title, string description, string userId);

        public ICollection<TopCommunityModel> GetTop();

        public CommunityModel Get(string name);
    }
}
