using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using OrionApi.Data;
using OrionApi.Data.Models;
using OrionApi.Models.Communities;
using OrionApi.Models.Post;

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

        public ICollection<TopCommunityModel> GetTop()
              => data.Communities
                .OrderByDescending(c => c.Members.Count)
                .ThenBy(c => c.Name)
                .Take(5)
                .Select(x => new TopCommunityModel
                {
                    Id = x.Id,
                    Name = x.Name
                })
                .ToList();

        public GetCommunityModel Get(string name, string userId = null)
            => data.Communities
                .Where(c => c.Name == name)
                .Select(x => new GetCommunityModel
                {
                    Name = x.Name,
                    CreatedOn = x.CreatedOn.ToString("dd-MMM-yyy", new CultureInfo("en-US")),
                    Description = x.Description,
                    Members = x.Members.Count,
                    UserIsCreator = x.CreatorId == userId,
                    UserIsMember = x.Members.Any(m => m.Id == userId),
                    Posts = x.Posts
                    .OrderByDescending(p => p.CreatedOn)
                    .ThenBy(p => p.Title)
                    .Select(p => new PostListingModel
                    {
                        Id = p.Id,
                        AuthorName = p.Author.UserName,
                        CommentsCount = p.Comments.Count,
                        CommunityName = x.Name,
                        Title = p.Title,
                        CreatedOn = p.CreatedOn.ToString("dd-MMM-yyy", new CultureInfo("en-US"))
                    }).ToList()

                })
            .FirstOrDefault();

        public bool IsMember(string communityName, string userId = null)
            => this.data.Users
                .Where(u => u.Id == userId)
                .Any(u => u.CommunitiesMember.Any(c => c.Name == communityName));

        public string GetId(string communityName)
            => data.Communities
                .Where(c => c.Name == communityName)
                .Select(x => x.Id)
                .FirstOrDefault();

        public async Task<string> Join(string communityName, string userId)
        {
            var community = data.Communities.Where(c => c.Name == communityName).FirstOrDefault();
            if (community == null)
            {
                throw new InvalidOperationException("Community does not exist.");
            }
            var isMember = data.Communities.Where(c => c.Name == communityName)
                .Any(c => c.Members.Any(m => m.Id == userId));
            if (isMember)
            {
                throw new InvalidOperationException("User is already a member.");
            }
            var user = await data.Users.FindAsync(userId);
            community.Members.Add(user);
            await data.SaveChangesAsync();

            return "User joined successfuly";
        }
    }
}
