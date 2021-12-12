using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OrionApi.Data.Models;

namespace OrionApi.Data
{
    public class OrionDbContext : IdentityDbContext<User>
    {
        public OrionDbContext(DbContextOptions options)
            :base(options)
        {
        }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<Community> Communities { get; set; }

        public DbSet<Post> Posts { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Post>()
                .HasOne(p => p.Community)
                .WithMany(c => c.Posts)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Comment>()
                .HasOne(c => c.Post)
                .WithMany(p => p.Comments)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Community>()
                .HasOne(c => c.Creator)
                .WithMany(u => u.CommunitiesCreator)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<User>()
                .HasMany(u => u.CommunitiesMember)
                .WithMany(c => c.Members);

            base.OnModelCreating(builder);
        }
    }
}
