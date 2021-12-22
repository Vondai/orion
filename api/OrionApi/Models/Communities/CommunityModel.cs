using System.Collections.Generic;
using OrionApi.Models.Post;

namespace OrionApi.Models.Communities
{
    public class CommunityModel
    {
        public CommunityModel()
        {
            this.Posts = new HashSet<PostListingModel>();
        }

        public string Name { get; set; }

        public string Description { get; set; }

        public int Members { get; set; }

        public string CreatedOn { get; set; }

        public bool IsMember { get; set; }

        public bool IsCreator { get; set; }

        public ICollection<PostListingModel> Posts { get; set; }
    }
}
