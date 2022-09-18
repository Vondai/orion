using OrionApi.Models.Communities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrionApi.Services.Communities
{
    public interface ICommunityService
    {
        public Task<string> Create(string title, string description, string userId);

        public ICollection<TopCommunityModel> GetTop();

        public GetCommunityModel Get(string name, string userId = null);

        public bool IsMember(string communityName, string userId = null);

        public string GetId(string communityName);

        public Task<string> Join(string communityName, string userId);
    }
}
