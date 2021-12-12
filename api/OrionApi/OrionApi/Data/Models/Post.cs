using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OrionApi.Data.Models
{
    public class Post
    {
        public Post()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Comments = new HashSet<Comment>();
        }

        public string Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        public DateTime CreatedOn { get; set; }

        [Required]
        public string UserId { get; set; }

        public User Author { get; set; }

        [Required]
        public string CommunityId { get; set; }

        public Community Community { get; set; }

        public ICollection<Comment> Comments { get; set; }
    }
}
