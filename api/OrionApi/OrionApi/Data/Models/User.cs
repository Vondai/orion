using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace OrionApi.Data.Models
{
    public class User : IdentityUser
    {
        public User()
        {
            this.Posts = new HashSet<Post>();
            this.Communities = new HashSet<Community>();
            this.Comments = new HashSet<Comment>();
        }

        public ICollection<Post> Posts { get; set; }

        public ICollection<Community> Communities { get; set; }

        public ICollection<Comment> Comments { get; set; }
    }
}
