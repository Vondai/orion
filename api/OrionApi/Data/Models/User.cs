using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace OrionApi.Data.Models
{
    public class User : IdentityUser
    {
        public User()
        {
            this.CommunitiesMember = new HashSet<Community>();
            this.CommunitiesCreator = new HashSet<Community>();
            this.Comments = new HashSet<Comment>();
            this.Posts = new HashSet<Post>();
        }

        public ICollection<Community> CommunitiesMember { get; set; }

        public ICollection<Community> CommunitiesCreator { get; set; }

        public ICollection<Comment> Comments { get; set; }

        public ICollection<Post> Posts { get; set; }

    }
}
