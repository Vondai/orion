using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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
                .OrderBy(c => c.Members.Count)
                .ThenBy(c => c.Name)
                .Take(5)
                .Select(x => new TopCommunityModel
                {
                    Id = x.Id,
                    Name = x.Name
                })
                .ToList();

        public CommunityModel Get(string name, string userId = null)
            => data.Communities
                .Where(c => c.Name == name)
                .Select(x => new CommunityModel
                {
                    Name = x.Name,
                    CreatedOn = x.CreatedOn.ToString("dd-MMM-yyy", new CultureInfo("en-US")),
                    Description = x.Description,
                    Members = x.Members.Count,
                    IsCreator = x.CreatorId == userId,
                    IsMember = x.Members.Any(m => m.Id == userId),
                    Posts = x.Posts
                        .OrderBy(p => p.CreatedOn)
                        .ThenBy(p => p.Title)
                        .Select(p => new PostListingModel
                        {
                            Id = p.Id,
                            Title = p.Title,
                            AuthorName = data.Posts.Where(post => post.Id == p.Id).Select(a => a.Author.UserName).FirstOrDefault(),
                            CommentsCount = p.Comments.Count,
                            CreatedOn = p.CreatedOn.ToString("g", new CultureInfo("en-US")),
                        })
                        .Take(5)
                        .ToList()
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
    }
}
