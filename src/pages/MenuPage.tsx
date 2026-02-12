import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { Star } from "lucide-react";

interface MenuItem {
  name: string;
  desc: string;
  price: number;
  fav?: boolean;
  gf?: boolean;
  extras?: string;
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

const menu: MenuCategory[] = [
  {
    title: "Warm-Up",
    items: [
      { name: "Queso Gone Wild", desc: "Smoked brisket folded into creamy queso with pico de gallo and jalapeños. Served hot with tortilla chips and fresh salsa.", price: 14, gf: true },
      { name: "Big Pretzel Energy", desc: "A jumbo Bavarian-style pretzel, brushed with butter and salt, served with our beer cheese and stone-ground mustard.", price: 17 },
      { name: "Goldy Curdy Goodness", desc: "Golden fried cheese curds drizzled with hot honey and served with ranch.", price: 12, fav: true },
      { name: "Backyard BBQ Stack", desc: "House chips or fries piled high with queso, pico de gallo, and a sweet BBQ drizzle.", price: 10, gf: true },
      { name: "Crunchy Dill Bites", desc: "Crispy fried pickles with a side of ranch or jalapeño ranch.", price: 9, fav: true },
    ],
  },
  {
    title: "Greens",
    items: [
      { name: "Back Porch House Salad", desc: "Crisp greens, cherry tomatoes, red onion, shredded cheese, and crunchy croutons. Choice of dressing.", price: 10, gf: true },
      { name: "Buffalo Chicken Crunch Salad", desc: "Crisp greens topped with fried chicken tossed in buffalo sauce, tomatoes, shredded cheese, and crunchy tortilla strips.", price: 15 },
      { name: "Cowboy Wedge Salad", desc: "A cold, crisp iceberg wedge loaded with bacon crumbles, tomatoes, red onion, and cheddar.", price: 11 },
    ],
  },
  {
    title: "Handhelds",
    items: [
      { name: "Lakehouse Street Tacos", desc: "Three warm corn tortillas loaded with your choice of brisket, pulled pork, or chicken, pico, and chipotle crema.", price: 16, gf: true },
      { name: "Mother Clucker", desc: "Crispy fried chicken or grilled topped with pickles and garlic aioli on a brioche bun.", price: 13, extras: "Nashville Hot or Buffalo +$1" },
      { name: "The Turkey Clubhouse", desc: "Toasted sourdough with roasted turkey, Swiss cheese, bacon, tomato, red onion, avocado ranch, and honey mustard.", price: 12, fav: true },
      { name: "456 Cheeseburger", desc: "¼ lb burger with cheddar, garlic aioli, pickles, onions, tomatoes, and lettuce on a brioche bun.", price: 14 },
      { name: 'Fit Burger "AKA Donny"', desc: "¼ lb burger topped with half a sliced avocado and roasted jalapeño, served on a bed of greens with creamy goat cheese.", price: 14, fav: true, gf: true },
      { name: "Pimento Hustler", desc: "¼ lb burger topped with house pimento cheese, candied jalapeños, and crispy bacon.", price: 16, fav: true },
      { name: "Jack'd & Loaded", desc: "¼ lb burger topped with pepper jack cheese, bacon, grilled onions, and Jack glaze on a brioche bun.", price: 15 },
      { name: "Brisket Jam Burger", desc: "¼ lb burger topped with smoked brisket, rich bacon jam, melted cheddar, and roasted garlic aioli.", price: 18 },
    ],
  },
  {
    title: "Entrees",
    items: [
      { name: "Nani's Country Chicken", desc: "Hand-breaded fried chicken smothered in bacon or jalapeño bacon gravy, served with mashed potatoes.", price: 17 },
      { name: "All Star Alfredo", desc: "Creamy. Cheesy. Indulgent. Fettuccine in rich Alfredo with Parmesan and cracked black pepper.", price: 9, fav: true },
      { name: "Smoked Mac Attack", desc: "Enjoy creamy smoked mac & cheese that satisfies.", price: 9 },
      { name: "Aunties Meatloaf", desc: "House-made meatloaf glazed with BBQ sauce, topped with crispy onion strings, and served with creamy mashed potatoes.", price: 15 },
      { name: "Chicken Fried Chaos", desc: "Texas-sized crispy chicken fried steak, in bacon or jalapeño bacon gravy, served with mashed potatoes.", price: 19 },
      { name: "The Loaded Spud Show", desc: "A jumbo baked potato loaded with butter, sour cream, cheddar, bacon, and green onions.", price: 10 },
    ],
  },
  {
    title: "Flatbreads",
    items: [
      { name: "Pitmaster BBQ", desc: "Smoked brisket, tangy BBQ sauce, red onion, and mozzarella baked to perfection.", price: 15 },
      { name: "Creamy Clucker Alfredo", desc: "Grilled chicken, rich house Alfredo, and melted mozzarella baked on a crispy crust.", price: 14 },
      { name: "Hot Honey Pepperoni", desc: "Pepperoni, mozzarella, and marinara finished with a drizzle of hot honey.", price: 14 },
      { name: "Cluckin' Good Bacon Ranch", desc: "Grilled chicken and crispy bacon layered over a creamy ranch base, and topped with melted mozzarella.", price: 14, fav: true },
    ],
  },
  {
    title: "The Side Pieces",
    items: [
      { name: "Mashed Potatoes", desc: "", price: 4 },
      { name: "Okra", desc: "", price: 5 },
      { name: "Green Beans", desc: "", price: 4 },
      { name: "Mac N' Cheese", desc: "", price: 4 },
      { name: "Handcut Fries", desc: "", price: 7 },
      { name: "Side Salad", desc: "Gluten free.", price: 6, gf: true },
    ],
  },
  {
    title: "Sugar Fix",
    items: [
      { name: "Cinnamon Crunch Cake", desc: "Sweet, crunchy, absolutely addictive.", price: 10 },
      { name: "Chocolate Fudge Brownie", desc: "Rich and decadent.", price: 12 },
      { name: "Bourbon Bread Pudding", desc: "Southern comfort in every bite.", price: 9, fav: true },
      { name: "Texas Pecan Pie", desc: "A Lone Star classic.", price: 8 },
      { name: 'B.Y.O.F. "Build Your Own Float"', desc: "Choose your soda, add a scoop of vanilla.", price: 5 },
    ],
  },
];

const MenuPage = () => {
  return (
    <Layout>
      <section className="pt-28 pb-8 bg-background">
        <div className="container-site text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase">
              Our <span className="gold-gradient-text">Menu</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-lg">We fry everything in beef tallow. You'll taste the difference.</p>
            <div className="mt-3 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Star size={14} className="text-primary fill-primary" /> House Favorite</span>
              <span className="italic">GF = Gluten Free</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {menu.map((category) => (
        <section key={category.title} className="py-10 bg-background border-t border-border">
          <div className="container-site">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-primary mb-8 text-center">
                {category.title}
              </h2>
            </FadeIn>
            <div className={`grid gap-4 ${category.items[0]?.desc ? "grid-cols-1 md:grid-cols-2" : "grid-cols-2 md:grid-cols-3"}`}>
              {category.items.map((item, i) => (
                <FadeIn key={item.name} delay={i * 0.05}>
                  <div className="bg-card rounded-lg p-5 border border-border hover:border-primary/20 transition-colors">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-display font-bold text-lg">{item.name}</h3>
                          {item.fav && <Star size={14} className="text-primary fill-primary" />}
                          {item.gf && <span className="text-xs text-muted-foreground italic">GF</span>}
                        </div>
                        {item.desc && <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>}
                        {item.extras && <p className="mt-1 text-xs text-primary">+ {item.extras}</p>}
                      </div>
                      <span className="text-primary font-display font-bold text-xl">${item.price}</span>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      ))}
    </Layout>
  );
};

export default MenuPage;
