using System;
using System.Linq;
using System.Threading.Tasks;
using OrionApi.Data;
using OrionApi.Data.Models;

namespace OrionApi.Services.Communities
{
    public class CommunityService : ICommunityService
    {
        private readonly OrionDbContext data;

        public CommunityService(OrionDbContext data)
        {
            this.data = data;
        }

        public async Task<string> Create(string title, string description, string userId)
        {
            var exists = data.Communities.Any(c => c.Name == title);
            if (exists)
            {
                throw new InvalidOperationException("Community already exists.");
            }

            var community = new Community
            {
                Name = title,
                Description = description,
                CreatedOn = DateTime.UtcNow,
                CreatorId = userId,
            };
            var user = data.Users.Find(userId);
            community.Members.Add(user);

            await data.Communities.AddAsync(community);
            await data.SaveChangesAsync();

            return community.Id;
        }
    }
}
