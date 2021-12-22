using System;

namespace OrionApi.Models.Post
{
    public class PostListingModel
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string AuthorName { get; set; }

        public string CreatedOn { get; set; }

        public int CommentsCount { get; set; }

        public string CommunityName { get; set; }
    }
}
