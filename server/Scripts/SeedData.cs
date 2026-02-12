using server.Model.Entities;

namespace server.Scripts;

public static class SeedData
{
    public static List<Bottom> MockBottoms =>
        new()
        {
            new Bottom
            {
                Name = "Cotton Cargo Pants",
                Price = 1299,
                StrikePrice = 1599,
                Fabric = new List<string> { "cotton", "canvas" },
                Style = new List<string> { "cargoPants" },
                Size = new List<string> { "m", "l", "xl" },
                Fit = new List<string> { "oversized" },
                Color = new List<string> { "beige", "green" },
                Quantity = 50,
                Description = "Comfortable cotton cargo pants with multiple pockets.",
                NewArrival = false,
                Trending = true,
                Views = 120,
                Sold = 120,
                Ratings = new Ratings { Total = 15, Stars = 4.5m },
                MainImage = new ImageInfo
                {
                    PublicId = "cargo_pants_1",
                    SecureUrl =
                        "https://static.zara.net/assets/public/6f3d/452a/382747fdac09/817f0fc8b85c/00108304800-p/00108304800-p.jpg?ts=1726477679086&w=1024",
                },
                AdditionalImage = new List<ImageInfo>
                {
                    new()
                    {
                        PublicId = "cargo_pants_2",
                        SecureUrl =
                            "https://static.zara.net/assets/public/6a67/cb0a/d7f84492a0d9/a5c8359a8eba/00108304800-a1/00108304800-a1.jpg?ts=1726477685610&w=1126",
                    },
                    new()
                    {
                        PublicId = "cargo_pants_3",
                        SecureUrl =
                            "https://static.zara.net/assets/public/483c/5e45/730746d8aa4d/eb561969e769/00108304800-a3/00108304800-a3.jpg?ts=1726477682395&w=750",
                    },
                },
            },
            new Bottom
            {
                Name = "Linen Joggers",
                Price = 899,
                StrikePrice = 1299,
                Fabric = new List<string> { "linen" },
                Style = new List<string> { "joggers" },
                Fit = new List<string> { "slimFit" },
                Size = new List<string> { "s", "m", "l" },
                Color = new List<string> { "gray", "blue" },
                Quantity = 100,
                Description = "Lightweight linen joggers perfect for casual wear.",
                NewArrival = true,
                Trending = false,
                Views = 200,
                Sold = 120,
                Ratings = new Ratings { Total = 25, Stars = 4.8m },
                MainImage = new ImageInfo
                {
                    PublicId = "linen_joggers_1",
                    SecureUrl =
                        "https://static.zara.net/assets/public/7015/341a/a6124822bdd2/6158fe15622e/00761491802-p/00761491802-p.jpg?ts=1740144752384&w=1024",
                },
                AdditionalImage = new List<ImageInfo>
                {
                    new()
                    {
                        PublicId = "linen_joggers_2",
                        SecureUrl =
                            "https://static.zara.net/assets/public/c163/e1ce/f39e40f99a7e/3ca0c4bedfce/00761491802-a1/00761491802-a1.jpg?ts=1740144752595&w=1126",
                    },
                    new()
                    {
                        PublicId = "linen_joggers_3",
                        SecureUrl =
                            "https://static.zara.net/assets/public/8acd/7388/562c4ff0992d/d2abe85de2ff/00761491802-a4/00761491802-a4.jpg?ts=1740479807968&w=750",
                    },
                },
            },
            new Bottom
            {
                Name = "Denim Shorts",
                Price = 799,
                StrikePrice = 999,
                Fabric = new List<string> { "denim" },
                Style = new List<string> { "shorts" },
                Size = new List<string> { "m", "l" },
                Color = new List<string> { "blue", "black" },
                Fit = new List<string> { "regularFit" },
                Quantity = 75,
                Description = "Classic denim shorts for a trendy summer look.",
                NewArrival = true,
                Trending = true,
                Views = 300,
                Sold = 120,
                Ratings = new Ratings { Total = 50, Stars = 4.7m },
                MainImage = new ImageInfo
                {
                    PublicId = "denim_shorts_1",
                    SecureUrl =
                        "https://static.zara.net/assets/public/7d38/1ee4/18864e69b95c/4e64c7289d4e/08197008443-p/08197008443-p.jpg?ts=1738774679148&w=1024",
                },
                AdditionalImage = new List<ImageInfo>
                {
                    new()
                    {
                        PublicId = "denim_shorts_2",
                        SecureUrl =
                            "https://static.zara.net/assets/public/c25d/1403/d7314ee58ca6/d88fc01a115b/08197008443-a1/08197008443-a1.jpg?ts=1738774680604&w=1126",
                    },
                    new()
                    {
                        PublicId = "denim_shorts_3",
                        SecureUrl =
                            "https://static.zara.net/assets/public/33a3/d8db/0ad442be8c94/5fb489a07a7f/08197008443-a3/08197008443-a3.jpg?ts=1738774679016&w=750",
                    },
                },
            },
            new Bottom
            {
                Name = "Polyester Track Pants",
                Price = 1099,
                StrikePrice = 1399,
                Fabric = new List<string> { "polyester" },
                Style = new List<string> { "trackPants" },
                Fit = new List<string> { "oversized" },
                Size = new List<string> { "m", "l", "xl" },
                Color = new List<string> { "black", "gray" },
                Quantity = 150,
                Description = "High-performance track pants for sports and fitness.",
                Views = 180,
                Sold = 120,
                NewArrival = true,
                Trending = false,
                Ratings = new Ratings { Total = 20, Stars = 4.3m },
                MainImage = new ImageInfo
                {
                    PublicId = "track_pants_1",
                    SecureUrl =
                        "https://static.zara.net/assets/public/3ea9/1079/0e0e493095b4/4a78ab2158ba/00761332605-p/00761332605-p.jpg?ts=1737708641902&w=1024",
                },
                AdditionalImage = new List<ImageInfo>
                {
                    new()
                    {
                        PublicId = "track_pants_2",
                        SecureUrl =
                            "https://static.zara.net/assets/public/42a4/d24d/f1d942379df6/7fa50e87411d/00761332605-a1/00761332605-a1.jpg?ts=1737708642343&w=1126",
                    },
                    new()
                    {
                        PublicId = "track_pants_3",
                        SecureUrl =
                            "https://static.zara.net/assets/public/7805/cbc0/85944d968852/3774f48288ea/00761332605-a2/00761332605-a2.jpg?ts=1737708641993&w=750",
                    },
                },
            },
            new Bottom
            {
                Name = "Woolen Trousers",
                Price = 1599,
                StrikePrice = 1999,
                Fabric = new List<string> { "wool" },
                Style = new List<string> { "cargoPants" },
                Fit = new List<string> { "relaxedFit" },
                Size = new List<string> { "xl", "xxl" },
                Color = new List<string> { "brown", "gray" },
                Quantity = 30,
                Description = "Warm woolen trousers for chilly weather.",
                NewArrival = true,
                Trending = false,
                Views = 90,
                Sold = 120,
                Ratings = new Ratings { Total = 10, Stars = 4.0m },
                MainImage = new ImageInfo
                {
                    PublicId = "wool_trousers_1",
                    SecureUrl =
                        "https://static.zara.net/assets/public/8072/ac52/3b10435f896d/a40c74b80e19/08574303052-p/08574303052-p.jpg?ts=1738065301602&w=1024",
                },
                AdditionalImage = new List<ImageInfo>
                {
                    new()
                    {
                        PublicId = "wool_trousers_2",
                        SecureUrl =
                            "https://static.zara.net/assets/public/7708/4ad0/0e64476389b5/b9f18d9d5b99/08574303052-a1/08574303052-a1.jpg?ts=1738065301293&w=1126",
                    },
                    new()
                    {
                        PublicId = "wool_trousers_3",
                        SecureUrl =
                            "https://static.zara.net/assets/public/8c5f/2c43/dbcc42a1939f/7edca62b7da6/08574303052-a3/08574303052-a3.jpg?ts=1738065300272&w=750",
                    },
                },
            },
        };

    public static List<Top> MockTops =>
        new()
        {
            new Top
            {
                Name = "Cotton Polo T-Shirt",
                Price = 799,
                StrikePrice = 999,
                Fabric = new List<string> { "cotton" },
                Design = new List<string> { "solidColor" },
                Style = new List<string> { "poloTShirt" },
                Occasion = new List<string> { "casual", "sportswear" },
                Season = new List<string> { "summer", "allSeason" },
                Seasonal = true,
                Fit = new List<string> { "regularFit" },
                SleeveType = new List<string> { "shortSleeve" },
                Size = new List<string> { "m", "l", "xl" },
                Color = new List<string> { "blue", "white" },
                Quantity = 100,
                NewArrival = false,
                Trending = true,
                Description = "Classic cotton polo T-shirt with a comfortable fit.",
                Views = 120,
                Sold = 120,
                Ratings = new Ratings { Total = 25, Stars = 4.5m },
                MainImage = new ImageInfo
                {
                    PublicId = "cotton_polo_tshirt_1",
                    SecureUrl =
                        "https://static.zara.net/assets/public/cc65/c185/6a414562984e/7132d4ce987d/02795408251-p/02795408251-p.jpg?ts=1740674200388&w=1024",
                },
                AdditionalImage = new List<ImageInfo>
                {
                    new()
                    {
                        PublicId = "cotton_polo_tshirt_2",
                        SecureUrl =
                            "https://static.zara.net/assets/public/6514/a0ff/de1248a29fc2/327ac3b5dbd9/02795408251-a1/02795408251-a1.jpg?ts=1740674201949&w=1126",
                    },
                    new()
                    {
                        PublicId = "cotton_polo_tshirt_3",
                        SecureUrl =
                            "https://static.zara.net/assets/public/6c7e/4a3d/72934d37a5e5/98a44b16843d/02795408251-a4/02795408251-a4.jpg?ts=1740674202077&w=750",
                    },
                },
            },
            new Top
            {
                Name = "Cotton T-Shirt",
                Price = 799,
                StrikePrice = 999,
                Fabric = new List<string> { "cotton" },
                Design = new List<string> { "solidColor" },
                Style = new List<string> { "tShirt" },
                Occasion = new List<string> { "casual", "sportswear" },
                Season = new List<string> { "summer", "allSeason" },
                Seasonal = true,
                Fit = new List<string> { "regularFit" },
                SleeveType = new List<string> { "shortSleeve" },
                Size = new List<string> { "m", "l", "xl" },
                Color = new List<string> { "blue", "white" },
                Quantity = 100,
                NewArrival = false,
                Trending = true,
                Description = "Classic cotton T-shirt with a comfortable fit.",
                Views = 120,
                Sold = 20,
                Ratings = new Ratings { Total = 25, Stars = 4.5m },
                MainImage = new ImageInfo
                {
                    PublicId = "cotton_tshirt_1",
                    SecureUrl =
                        "https://static.zara.net/assets/public/bd8c/051e/4c3644b58e99/1b040b0102ff/07140407500-p/07140407500-p.jpg?ts=1738760586177&w=1024",
                },
                AdditionalImage = new List<ImageInfo>
                {
                    new()
                    {
                        PublicId = "cotton_tshirt_2",
                        SecureUrl =
                            "https://static.zara.net/assets/public/3097/86bd/256f49b589ca/c026391d280f/07140407500-a1/07140407500-a1.jpg?ts=1738760582626&w=1126",
                    },
                    new()
                    {
                        PublicId = "cotton_tshirt_3",
                        SecureUrl =
                            "https://static.zara.net/assets/public/dba3/b64e/0c234c77bb97/53add80d02f7/07140407500-a2/07140407500-a2.jpg?ts=1738760582483&w=750",
                    },
                },
            },
            new Top
            {
                Name = "Printed Graphic Hoodie",
                Price = 1599,
                StrikePrice = 1999,
                Fabric = new List<string> { "fleece" },
                Design = new List<string> { "graphic" },
                Style = new List<string> { "hoodie" },
                Occasion = new List<string> { "casual", "loungewear" },
                Season = new List<string> { "winter" },
                Seasonal = true,
                Fit = new List<string> { "relaxedFit" },
                SleeveType = new List<string> { "longSleeve" },
                Size = new List<string> { "m", "l", "xxl" },
                Color = new List<string> { "black", "gray" },
                Quantity = 50,
                Description = "Warm fleece hoodie with a stylish graphic print.",
                NewArrival = true,
                Trending = true,
                Views = 200,
                Sold = 1200,
                Ratings = new Ratings { Total = 40, Stars = 4.7m },
                MainImage = new ImageInfo
                {
                    PublicId = "graphic_hoodie_1",
                    SecureUrl =
                        "https://static.zara.net/assets/public/a7cd/93f8/7b614897a15c/751f40563995/00085155922-p/00085155922-p.jpg?ts=1737712364153&w=1024",
                },
                AdditionalImage = new List<ImageInfo>
                {
                    new()
                    {
                        PublicId = "graphic_hoodie_2",
                        SecureUrl =
                            "https://static.zara.net/assets/public/e1da/a179/4e984507bb0e/6e796f39b534/00085155922-e1/00085155922-e1.jpg?ts=1737630308079&w=1126",
                    },
                    new()
                    {
                        PublicId = "graphic_hoodie_3",
                        SecureUrl =
                            "https://static.zara.net/assets/public/b1b1/2a06/1b8b412488ca/d59b07afa8a8/00085155922-e2/00085155922-e2.jpg?ts=1737630310195&w=750",
                    },
                },
            },
            new Top
            {
                Name = "Raincoat",
                Price = 1699,
                StrikePrice = 2199,
                Fabric = new List<string> { "polyester", "nylon" },
                Design = new List<string> { "graphic" },
                Style = new List<string> { "jacket" },
                Occasion = new List<string> { "casual" },
                Season = new List<string> { "rainy" },
                Seasonal = true,
                Fit = new List<string> { "oversized" },
                SleeveType = new List<string> { "longSleeve" },
                Size = new List<string> { "s", "m", "l", "xl", "xxl", "xxxl" },
                Color = new List<string> { "blue", "black", "gray", "green" },
                Quantity = 100,
                Description =
                    "A lightweight, waterproof topwear perfect for rainy days. Features a hood for extra protection against rain, while remaining breathable and comfortable for active use.",
                NewArrival = true,
                Trending = true,
                Views = 450,
                Sold = 800,
                Ratings = new Ratings { Total = 50, Stars = 4.6m },
                MainImage = new ImageInfo
                {
                    PublicId = "rainy_topwear_1",
                    SecureUrl =
                        "https://static.zara.net/assets/public/3d87/8937/d8e0469f8850/b4d2972933f1/03286311806-p/03286311806-p.jpg?ts=1738925051289&w=1024",
                },
                AdditionalImage = new List<ImageInfo>
                {
                    new()
                    {
                        PublicId = "rainy_topwear_2",
                        SecureUrl =
                            "https://static.zara.net/assets/public/bb71/1ab7/c9a14f739504/5985e953fc36/03286311806-a1/03286311806-a1.jpg?ts=1738925051582&w=1126",
                    },
                    new()
                    {
                        PublicId = "rainy_topwear_3",
                        SecureUrl =
                            "https://static.zara.net/assets/public/2dba/66cc/28ce43b0b05a/80cd01af6b2f/03286311806-a2/03286311806-a2.jpg?ts=1738925051080&w=750",
                    },
                },
            },
            new Top
            {
                Name = "Linen Casual Shirt",
                Price = 1199,
                StrikePrice = 1499,
                Fabric = new List<string> { "linen" },
                Design = new List<string> { "solidColor" },
                Style = new List<string> { "casualShirt" },
                Occasion = new List<string> { "casual", "vacation" },
                Season = new List<string> { "summer" },
                Fit = new List<string> { "slimFit" },
                SleeveType = new List<string> { "longSleeve" },
                Size = new List<string> { "s", "m", "l" },
                Color = new List<string> { "beige", "green" },
                Quantity = 80,
                Description = "Breathable linen casual shirt for a relaxed look.",
                Views = 150,
                Sold = 110,
                NewArrival = true,
                Trending = false,
                Ratings = new Ratings { Total = 30, Stars = 4.6m },
                MainImage = new ImageInfo
                {
                    PublicId = "linen_casual_shirt_1",
                    SecureUrl =
                        "https://static.zara.net/assets/public/7769/6e28/ea554422861b/9fb3f0be66aa/01063460526-p/01063460526-p.jpg?ts=1740586266100&w=1024",
                },
                AdditionalImage = new List<ImageInfo>
                {
                    new()
                    {
                        PublicId = "linen_casual_shirt_2",
                        SecureUrl =
                            "https://static.zara.net/assets/public/cf88/4562/ee5645a9848a/c53af4362974/01063460526-a1/01063460526-a1.jpg?ts=1740586266247&w=1126",
                    },
                    new()
                    {
                        PublicId = "linen_casual_shirt_3",
                        SecureUrl =
                            "https://static.zara.net/assets/public/f489/40ec/19fe4e518386/c08c5e90c347/01063460526-a2/01063460526-a2.jpg?ts=1740586266176&w=750",
                    },
                },
            },
            new Top
            {
                Name = "Denim Jacket",
                Price = 1999,
                StrikePrice = 2499,
                Fabric = new List<string> { "denim" },
                Design = new List<string> { "solidColor" },
                Style = new List<string> { "denimJacket" },
                Occasion = new List<string> { "casual", "vacation" },
                Season = new List<string> { "winter", "allSeason" },
                Fit = new List<string> { "regularFit" },
                SleeveType = new List<string> { "longSleeve" },
                Size = new List<string> { "m", "l", "xxl" },
                Color = new List<string> { "blue", "black" },
                Quantity = 60,
                Description = "Trendy denim jacket for all occasions.",
                NewArrival = true,
                Trending = false,
                Seasonal = true,
                Views = 1300,
                Sold = 300,
                Ratings = new Ratings { Total = 50, Stars = 4.8m },
                MainImage = new ImageInfo
                {
                    PublicId = "denim_jacket_1",
                    SecureUrl =
                        "https://static.zara.net/assets/public/33ba/2022/83e24d7ba5c2/766ad6a80f4c/01538406505-p/01538406505-p.jpg?ts=1737539039946&w=1024",
                },
                AdditionalImage = new List<ImageInfo>
                {
                    new()
                    {
                        PublicId = "denim_jacket_2",
                        SecureUrl =
                            "https://static.zara.net/assets/public/0825/37ff/d99b4bb1bded/7c90ef404800/01538406505-a1/01538406505-a1.jpg?ts=1737539041748&w=1126",
                    },
                    new()
                    {
                        PublicId = "denim_jacket_3",
                        SecureUrl =
                            "https://static.zara.net/assets/public/627b/75f1/cbf24c5d89fb/4aac118d807a/01538406505-a4/01538406505-a4.jpg?ts=1737539042024&w=750",
                    },
                },
            },
            new Top
            {
                Name = "Woolen Sweater",
                Price = 1499,
                StrikePrice = 1799,
                Fabric = new List<string> { "wool" },
                Design = new List<string> { "solidColor" },
                Style = new List<string> { "sweater" },
                Occasion = new List<string> { "loungewear", "vacation" },
                Season = new List<string> { "winter" },
                Fit = new List<string> { "oversized" },
                SleeveType = new List<string> { "longSleeve" },
                Size = new List<string> { "l", "xl", "xxxl" },
                Color = new List<string> { "red", "gray" },
                Quantity = 40,
                Description = "Cozy woolen sweater perfect for winter days.",
                NewArrival = true,
                Trending = false,
                Views = 90,
                Sold = 80,
                Ratings = new Ratings { Total = 20, Stars = 4.3m },
                MainImage = new ImageInfo
                {
                    PublicId = "woolen_sweater_1",
                    SecureUrl =
                        "https://static.zara.net/assets/public/34d9/c35d/376c4b2b8c4b/78bd8845e95c/03332310712-p/03332310712-p.jpg?ts=1731070043088&w=1024",
                },
                AdditionalImage = new List<ImageInfo>
                {
                    new()
                    {
                        PublicId = "woolen_sweater_2",
                        SecureUrl =
                            "https://static.zara.net/assets/public/21dc/2a63/7db54aca8551/40fbd325059a/03332310712-a1/03332310712-a1.jpg?ts=1731070044033&w=1126",
                    },
                    new()
                    {
                        PublicId = "woolen_sweater_3",
                        SecureUrl =
                            "https://static.zara.net/assets/public/0cf4/c2f8/154846a69bc9/24b74c0f8588/03332310712-a4/03332310712-a4.jpg?ts=1731070044041&w=750",
                    },
                },
            },
        };
}
