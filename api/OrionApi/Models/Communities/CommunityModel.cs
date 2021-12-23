using System.Collections.Generic;
using OrionApi.Models.Post;

namespace OrionApi.Models.Communities
{
    public class CommunityModel
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public int Members { get; set; }

        public string CreatedOn { get; set; }

        public bool UserIsMember { get; set; }

        public bool UserIsCreator { get; set; }
    }
}
