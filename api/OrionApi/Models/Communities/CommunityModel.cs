namespace OrionApi.Models.Communities
{
    public class CommunityModel
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public int Members { get; set; }

        public string CreatedOn { get; set; }

        public bool IsMember { get; set; }

        public bool IsCreator { get; set; }
    }
}
