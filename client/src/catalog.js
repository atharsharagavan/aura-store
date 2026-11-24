const photo = (id, width = 760) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

const records = [
  ['100000000000000000000001', 'Cloud-knit crewneck', 3999, 'Clothing', 'A soft cotton blend with a relaxed fit and clean, ribbed finish.', 'photo-1576566588028-4147f3842f27', 'Customer favorite', 4.8, 214, 'Unisex'],
  ['100000000000000000000002', 'Everyday Oxford shirt', 2499, 'Clothing', 'Crisp cotton, an easy cut, and a collar that keeps its shape.', 'photo-1598033129183-c4f50c736f10', '', 4.7, 96, 'Unisex'],
  ['100000000000000000000003', 'Ribbed cotton tee', 999, 'Clothing', 'A substantial everyday tee in soft, breathable cotton.', 'photo-1521572163474-6864f9cf17ab', 'Bestseller', 4.6, 341, 'Unisex'],
  ['100000000000000000000004', 'Linen overshirt', 3299, 'Clothing', 'Lightweight European linen for the days between seasons.', 'photo-1603252109303-2751441dd157', '', 4.7, 82, 'Unisex'],
  ['100000000000000000000005', 'Weekend chino', 2799, 'Clothing', 'A little stretch and a straight leg make these easy to live in.', 'photo-1473966968600-fa801b869a1a', '', 4.5, 67, 'Unisex'],
  ['100000000000000000000006', 'Merino cardigan', 4499, 'Clothing', 'Fine-gauge merino wool with a neat, understated profile.', 'photo-1618354691373-d851c5c3a990', 'New', 4.8, 42, 'Unisex'],
  ['100000000000000000000007', 'Canvas low tops', 3499, 'Clothing', 'A sturdy canvas upper, comfortable footbed, and timeless shape.', 'photo-1525966222134-fcfa99b8ae77', '', 4.6, 183, 'Unisex'],
  ['100000000000000000000008', 'Rainproof shell jacket', 5999, 'Clothing', 'A packable outer layer for unpredictable weather.', 'photo-1544923246-77307dd654cb', '', 4.4, 51, 'Unisex'],

  ['100000000000000000000009', 'Cotton poplin shirt', 2399, 'Clothing', 'A crisp poplin shirt with a relaxed shape and mother-of-pearl buttons.', 'photo-1598033129183-c4f50c736f10', '', 4.7, 34, 'Women'],
  ['100000000000000000000010', 'Tailored wide-leg trouser', 2899, 'Clothing', 'A fluid high-rise trouser with a clean front and easy drape.', 'photo-1506629905607-d9a80d9b2f9a', '', 4.6, 28, 'Women'],
  ['100000000000000000000011', 'Linen blend summer dress', 3499, 'Clothing', 'A breathable midi dress with a softly shaped waist.', 'photo-1515886657613-9f3515b0c78f', 'New', 4.8, 19, 'Women'],
  ['100000000000000000000012', 'Everyday rib tank', 899, 'Clothing', 'A soft stretch-cotton tank made for layering or wearing on its own.', 'photo-1503342217505-b0a15ec3261c', '', 4.5, 47, 'Women'],
  ['100000000000000000000013', 'Structured knit polo', 2199, 'Clothing', 'A fine-gauge knit polo with a neat collar and smooth finish.', 'photo-1576566588028-4147f3842f27', '', 4.6, 21, 'Women'],
  ['100000000000000000000014', 'Straight-leg denim', 2799, 'Clothing', 'Mid-rise denim with a straight fit and softly washed finish.', 'photo-1541099649105-f69ad21f3246', 'Bestseller', 4.7, 64, 'Women'],
  ['100000000000000000000015', 'Lightweight trench coat', 6999, 'Clothing', 'A water-resistant layer with a clean silhouette and removable belt.', 'photo-1548126032-079a0fb0099d', '', 4.5, 17, 'Women'],
  ['100000000000000000000016', 'Soft jersey lounge set', 2499, 'Clothing', 'A breathable matching top and trouser set for slow weekends.', 'photo-1551163943-3f6a855d1153', '', 4.6, 31, 'Women'],
  ['100000000000000000000017', 'Minimal leather flats', 3299, 'Clothing', 'Supple leather flats with a cushioned footbed and understated shape.', 'photo-1543163521-1bf539c55dd2', '', 4.5, 23, 'Women'],
  ['100000000000000000000018', 'Textured cotton kurta', 1999, 'Clothing', 'A breathable cotton kurta with subtle texture and a straight cut.', 'photo-1583391733956-6c78276477e3', '', 4.7, 40, 'Women'],

  ['100000000000000000000019', 'Oxford button-down shirt', 2599, 'Clothing', 'A durable cotton Oxford with a tidy collar and regular fit.', 'photo-1598033129183-c4f50c736f10', '', 4.7, 58, 'Men'],
  ['100000000000000000000020', 'Tapered stretch chinos', 2799, 'Clothing', 'A comfortable cotton-stretch chino with a modern tapered leg.', 'photo-1473966968600-fa801b869a1a', 'Bestseller', 4.8, 72, 'Men'],
  ['100000000000000000000021', 'Heavyweight pocket tee', 1199, 'Clothing', 'Structured cotton jersey with a relaxed fit and clean chest pocket.', 'photo-1521572163474-6864f9cf17ab', '', 4.6, 55, 'Men'],
  ['100000000000000000000022', 'Linen blend camp shirt', 2299, 'Clothing', 'An airy short-sleeve shirt with a camp collar and straight hem.', 'photo-1603252109303-2751441dd157', '', 4.5, 26, 'Men'],
  ['100000000000000000000023', 'Merino crew sweater', 4499, 'Clothing', 'Fine merino knit with a comfortable crew neck and ribbed trim.', 'photo-1618354691373-d851c5c3a990', '', 4.8, 37, 'Men'],
  ['100000000000000000000024', 'Classic denim jacket', 4999, 'Clothing', 'A sturdy cotton denim layer with a timeless straight fit.', 'photo-1543076447-215ad9ba6923', '', 4.6, 32, 'Men'],
  ['100000000000000000000025', 'Relaxed-fit jogger', 1899, 'Clothing', 'Soft brushed cotton with an adjustable waist and tapered cuff.', 'photo-1552902865-b72c031ac5ea', '', 4.5, 43, 'Men'],
  ['100000000000000000000026', 'Leather court sneakers', 3899, 'Clothing', 'Low-profile leather sneakers with a cushioned everyday sole.', 'photo-1542291026-7eec264c27ff', 'New', 4.7, 29, 'Men'],
  ['100000000000000000000027', 'Water-resistant parka', 6499, 'Clothing', 'A practical midweight shell with a lined hood and useful pockets.', 'photo-1544923246-77307dd654cb', '', 4.6, 18, 'Men'],
  ['100000000000000000000028', 'Cotton flannel overshirt', 3199, 'Clothing', 'A brushed cotton layer that works over tees or under a coat.', 'photo-1598033129183-c4f50c736f10', '', 4.6, 24, 'Men'],

  ['100000000000000000000029', 'Kids cotton graphic tee', 799, 'Clothing', 'Soft everyday cotton with a playful print and easy crew neckline.', 'photo-1503919005314-30d93d07d823', '', 4.7, 41, 'Kids'],
  ['100000000000000000000030', 'Kids fleece hoodie', 1499, 'Clothing', 'A cosy brushed-fleece hoodie with a roomy front pocket.', 'photo-1519238263530-99bdd11df2ea', 'Bestseller', 4.8, 52, 'Kids'],
  ['100000000000000000000031', 'Kids pull-on joggers', 1199, 'Clothing', 'Soft stretch joggers with a gentle elastic waist for all-day play.', 'photo-1516627145497-ae6968895b74', '', 4.6, 37, 'Kids'],
  ['100000000000000000000032', 'Kids denim dungarees', 1999, 'Clothing', 'Adjustable-strap denim dungarees with handy front pockets.', 'photo-1503944583220-79d8926ad5e2', '', 4.7, 25, 'Kids'],
  ['100000000000000000000033', 'Kids striped cotton dress', 1699, 'Clothing', 'A light cotton dress with a simple stripe and easy gathered skirt.', 'photo-1518834107812-67b0b7c58434', '', 4.5, 19, 'Kids'],
  ['100000000000000000000034', 'Kids canvas trainers', 1799, 'Clothing', 'Easy-on canvas trainers with a flexible sole for everyday adventures.', 'photo-1514989940723-e8e51635b782', '', 4.6, 33, 'Kids'],
  ['100000000000000000000035', 'Kids rain jacket', 2499, 'Clothing', 'A lightweight water-resistant jacket with reflective details.', 'photo-1519238263530-99bdd11df2ea', '', 4.6, 16, 'Kids'],
  ['100000000000000000000036', 'Kids cotton pyjama set', 1399, 'Clothing', 'A breathable two-piece sleep set in soft, smooth cotton.', 'photo-1516627145497-ae6968895b74', '', 4.7, 28, 'Kids'],
  ['100000000000000000000037', 'Kids quilted gilet', 2199, 'Clothing', 'A light quilted layer for changing weather, with secure side pockets.', 'photo-1503944583220-79d8926ad5e2', 'New', 4.5, 14, 'Kids'],
  ['100000000000000000000038', 'Kids cotton leggings, 2-pack', 1299, 'Clothing', 'Two soft cotton-stretch leggings made for movement and play.', 'photo-1518834107812-67b0b7c58434', '', 4.8, 46, 'Kids'],

  ['200000000000000000000001', 'Everyday leather tote', 3799, 'Accessories', 'Room for the daily essentials, finished with sturdy shoulder straps.', 'photo-1594223274512-ad4803739b7c', 'Bestseller', 4.8, 287],
  ['200000000000000000000002', 'Compact crossbody', 4499, 'Accessories', 'A hands-free bag with considered pockets and a simple profile.', 'photo-1548036328-c9fa89d128fa', '', 4.7, 115],
  ['200000000000000000000003', 'Slim card case', 1599, 'Accessories', 'A small, durable wallet made to carry just what you need.', 'photo-1627123424574-724758594e93', '', 4.5, 92],
  ['200000000000000000000004', 'Classic field watch', 6999, 'Accessories', 'A clean dial and dependable movement in a brushed steel case.', 'photo-1524805444758-089113d48a6d', 'Customer favorite', 4.8, 204],
  ['200000000000000000000005', 'Insulated bottle', 899, 'Accessories', 'Double-wall stainless steel keeps drinks cold or warm on the go.', 'photo-1602143407151-7111542de6e8', '', 4.6, 138],
  ['200000000000000000000006', 'Leather belt', 1999, 'Accessories', 'Full-grain leather with a brushed buckle that wears in beautifully.', 'photo-1624222247344-550fb8c50f8b', '', 4.6, 73],
  ['200000000000000000000007', 'Rib-knit beanie', 1299, 'Accessories', 'A soft wool blend with a comfortable, not-too-tight fit.', 'photo-1576871337622-98d48d1cf531', '', 4.5, 61],
  ['200000000000000000000008', 'Weekend duffle', 4999, 'Accessories', 'A roomy carryall with a reinforced base and easy-access pockets.', 'photo-1553062407-98eeb64c6a62', 'New', 4.7, 38],

  ['300000000000000000000001', 'Studio wireless headphones', 7999, 'Tech', 'Balanced sound, soft ear cushions, and all-day wireless listening.', 'photo-1505740420928-5e560c06d30e', 'Bestseller', 4.8, 412],
  ['300000000000000000000002', 'Mechanical keyboard', 6499, 'Tech', 'A compact layout with tactile switches and a solid aluminum top.', 'photo-1587829741301-dc798b83add3', '', 4.7, 164],
  ['300000000000000000000003', 'Bluetooth speaker', 4999, 'Tech', 'Room-filling sound from a small, travel-ready speaker.', 'photo-1608043152269-423dbba4e7e1', '', 4.6, 129],
  ['300000000000000000000004', 'USB-C charging hub', 1599, 'Tech', 'One small hub for charging a laptop, phone, and everyday devices.', 'photo-1625842268584-8f3296236761', '', 4.4, 53],
  ['300000000000000000000005', 'Full HD webcam', 5999, 'Tech', 'Clear video and a simple clip-on design for a better desk setup.', 'photo-1587826080692-f439cd0b70da', '', 4.5, 88],
  ['300000000000000000000006', 'Wireless precision mouse', 2999, 'Tech', 'Quiet clicks, a comfortable shape, and reliable wireless control.', 'photo-1527864550417-7fd91fc51a46', '', 4.6, 201],
  ['300000000000000000000007', 'USB desk microphone', 5499, 'Tech', 'A clear, focused sound for calls, classes, and recording.', 'photo-1590602847861-f357a9332bbc', 'New', 4.7, 33],
  ['300000000000000000000008', 'Warm LED desk light', 2499, 'Tech', 'Soft adjustable light with a compact base and clean controls.', 'photo-1507473885765-e6ed057f782c', '', 4.5, 77],

  ['400000000000000000000001', 'Stoneware mug set', 1499, 'Home', 'Two hand-finished mugs with a comfortable handle and matte glaze.', 'photo-1514228742587-6b1558fcca3d', 'Customer favorite', 4.9, 156],
  ['400000000000000000000002', 'Walnut desk lamp', 4199, 'Home', 'Warm light, a weighted base, and an adjustable shade.', 'photo-1507473885765-e6ed057f782c', '', 4.7, 83],
  ['400000000000000000000003', 'Linen throw blanket', 4999, 'Home', 'A breathable textured layer for the sofa or the end of the bed.', 'photo-1600210492486-724fe5c67fb0', '', 4.8, 68],
  ['400000000000000000000004', 'Ceramic table vase', 1999, 'Home', 'A softly shaped stoneware vase, lovely with or without flowers.', 'photo-1578500494198-246f612d3b3d', '', 4.6, 71],
  ['400000000000000000000005', 'Woven storage baskets', 2499, 'Home', 'A set of three baskets for shelves, entryways, and everyday clutter.', 'photo-1593085260707-5377ba37f868', '', 4.5, 44],
  ['400000000000000000000006', 'Pour-over coffee set', 2799, 'Home', 'A simple ceramic dripper and carafe for a slower morning cup.', 'photo-1495474472287-4d71bcdd2085', 'Bestseller', 4.8, 193],
  ['400000000000000000000007', 'Oak picture frame', 1299, 'Home', 'Solid oak with a slim profile for the pictures worth keeping.', 'photo-1513519245088-0e12902e5a38', '', 4.6, 39],
  ['400000000000000000000008', 'Cotton bath towel set', 3499, 'Home', 'A pair of soft, absorbent towels in a calm, versatile color.', 'photo-1600369671236-e74521d4b6ad', '', 4.7, 57]
];

export const CATEGORIES = ['All departments', 'Clothing', 'Accessories', 'Tech', 'Home'];
export const CLOTHING_AUDIENCES = ['Women', 'Men', 'Kids'];

const productRefresh = {
  'Cloud-knit crewneck': ['Boxy cotton crewneck', 3299, 'Soft heavyweight cotton with a relaxed fit.'],
  'Everyday Oxford shirt': ['Relaxed Oxford shirt', 2799, 'Crisp cotton with an easy, roomy cut.'],
  'Ribbed cotton tee': ['Washed heavyweight tee', 1299, 'Structured cotton jersey with a soft garment wash.'],
  'Linen overshirt': ['Relaxed utility overshirt', 3599, 'A light layering piece with clean utility pockets.'],
  'Weekend chino': ['Relaxed barrel-leg trouser', 3299, 'Easy volume through the leg with a clean drape.'],
  'Merino cardigan': ['Textured half-zip knit', 4999, 'A neat, breathable knit with a modern half zip.'],
  'Canvas low tops': ['Retro runner sneakers', 3999, 'A low-profile everyday runner with a cushioned sole.'],
  'Rainproof shell jacket': ['Packable technical shell', 6499, 'Lightweight weather protection in a compact layer.'],
  'Cotton poplin shirt': ['Printed cotton co-ord', 3299, 'A breathable matching set with an easy, modern fit.'],
  'Tailored wide-leg trouser': ['Fluid wide-leg trousers', 3199, 'A high-rise fit with a long, fluid silhouette.'],
  'Linen blend summer dress': ['Draped jersey maxi dress', 3899, 'A clean column shape in soft, breathable jersey.'],
  'Everyday rib tank': ['Ribbed layering tank', 999, 'A smooth stretch-cotton layer with a close fit.'],
  'Structured knit polo': ['Striped zip-collar knit', 2499, 'A compact knit with a sporty zip neckline.'],
  'Straight-leg denim': ['Barrel-leg washed denim', 3299, 'Relaxed denim with a curved leg and soft wash.'],
  'Lightweight trench coat': ['Cropped utility jacket', 4999, 'A lightweight jacket with an adjustable hem.'],
  'Soft jersey lounge set': ['Scuba-knit lounge set', 2999, 'A soft matching set with a clean, modern shape.'],
  'Minimal leather flats': ['Mesh ballet sneakers', 3499, 'A breathable mesh upper with a flexible flat sole.'],
  'Textured cotton kurta': ['Modern cotton kurta set', 2599, 'Textured cotton with a straight, easy silhouette.'],
  'Oxford button-down shirt': ['Modern relaxed button-down', 2899, 'A clean button-down cut from crisp cotton.'],
  'Tapered stretch chinos': ['Wide utility trousers', 3199, 'A relaxed straight leg with subtle utility details.'],
  'Heavyweight pocket tee': ['Boxy heavyweight tee', 1499, 'Dense cotton jersey with a dropped shoulder.'],
  'Linen blend camp shirt': ['Textured camp-collar shirt', 2599, 'An airy short-sleeve shirt with a relaxed collar.'],
  'Merino crew sweater': ['Textured quarter-zip sweater', 4699, 'A fine-gauge knit with a clean quarter zip.'],
  'Classic denim jacket': ['Washed denim overshirt', 4499, 'A soft, structured denim layer with roomy pockets.'],
  'Relaxed-fit jogger': ['Straight-leg track pant', 2199, 'Soft performance jersey with an open hem.'],
  'Leather court sneakers': ['Retro court sneakers', 4299, 'A streamlined leather upper with a cushioned footbed.'],
  'Water-resistant parka': ['Technical field jacket', 6999, 'A water-resistant shell with a pared-back finish.'],
  'Cotton flannel overshirt': ['Boxy brushed overshirt', 3499, 'Brushed cotton in an easy, layered fit.'],
  'Kids cotton graphic tee': ['Kids colour-block tee', 899, 'Soft cotton with a simple colour-block finish.'],
  'Kids fleece hoodie': ['Kids zip fleece hoodie', 1699, 'A soft zip-through layer for everyday wear.'],
  'Kids pull-on joggers': ['Kids straight-leg track pants', 1299, 'Soft stretch fabric with an easy elastic waist.'],
  'Kids denim dungarees': ['Kids utility dungarees', 2199, 'Adjustable straps and practical patch pockets.'],
  'Kids striped cotton dress': ['Kids striped rugby dress', 1799, 'A relaxed cotton dress with a sporty collar.'],
  'Kids canvas trainers': ['Kids velcro runner sneakers', 1899, 'A flexible runner with easy adjustable straps.'],
  'Kids rain jacket': ['Kids colour-block rain shell', 2699, 'A lightweight water-resistant layer for rainy days.'],
  'Kids cotton pyjama set': ['Kids printed kimono co-ord', 1799, 'A colourful two-piece set in soft, breathable cotton.'],
  'Kids quilted gilet': ['Kids insulated gilet', 2399, 'A light padded layer with a neat stand collar.'],
  'Kids cotton leggings, 2-pack': ['Kids leggings, two-pack', 1399, 'Two soft stretch-cotton leggings for everyday wear.'],
  'Everyday leather tote': ['Soft-structure work tote', 4299, 'A roomy carryall for a laptop and daily essentials.'],
  'Compact crossbody': ['Mini crescent sling bag', 3799, 'A compact hands-free bag with an adjustable strap.'],
  'Slim card case': ['Magnetic phone wallet', 1899, 'A slim card holder designed for magnetic phone cases.'],
  'Classic field watch': ['Minimal steel smartwatch', 7999, 'A slim everyday watch with a clear, bright display.'],
  'Insulated bottle': ['Vacuum travel tumbler', 1299, 'Double-wall steel with a spill-resistant lid.'],
  'Leather belt': ['Reversible everyday belt', 2199, 'A clean reversible belt with a low-profile buckle.'],
  'Rib-knit beanie': ['Everyday five-panel cap', 1199, 'A lightweight cap with a structured crown.'],
  'Weekend duffle': ['Cabin-size travel duffle', 5499, 'A compact carry-on with a padded laptop sleeve.'],
  'Studio wireless headphones': ['Adaptive noise-cancelling earbuds', 8999, 'Pocket-size wireless audio with active noise control.'],
  'Mechanical keyboard': ['Low-profile wireless keyboard', 6999, 'A compact wireless board with quiet tactile keys.'],
  'Bluetooth speaker': ['Pocket Bluetooth speaker', 5499, 'A compact speaker built for indoor and outdoor listening.'],
  'USB-C charging hub': ['3-in-1 magnetic charging stand', 3299, 'A tidy wireless charging stand for daily devices.'],
  'Full HD webcam': ['Compact mirrorless camera', 42999, 'A pocketable camera for sharp everyday photos and video.'],
  'Wireless precision mouse': ['Ergonomic wireless mouse', 3299, 'A quiet, rechargeable mouse with a compact shape.'],
  'USB desk microphone': ['Portable creator microphone', 5999, 'A plug-and-play mic for calls and short-form video.'],
  'Warm LED desk light': ['Rechargeable ambient lamp', 3499, 'A cordless lamp with adjustable warm light.'],
  'Stoneware mug set': ['Stackable ceramic cup set', 1799, 'A pair of glazed cups made to stack neatly.'],
  'Walnut desk lamp': ['Portable rechargeable lamp', 4999, 'A sculptural cordless lamp with a dimmable glow.'],
  'Linen throw blanket': ['Textured cotton throw', 3799, 'A lightweight woven layer for sofa or bed.'],
  'Ceramic table vase': ['Sculptural ceramic vessel', 2299, 'A modern stoneware form for shelves and tables.'],
  'Woven storage baskets': ['Modular woven storage set', 2899, 'Three nesting baskets for tidy shelves and entryways.'],
  'Pour-over coffee set': ['Compact espresso maker', 4999, 'A compact manual brewer for a rich daily coffee.'],
  'Oak picture frame': ['Robot vacuum with auto-empty dock', 24999, 'A low-profile robot vacuum with a self-emptying dock.'],
  'Cotton bath towel set': ['Plush cotton bath sheet set', 3999, 'Soft, absorbent cotton towels with a generous size.']
};

const freshPhotos = {
  'USB-C charging hub': 'photo-1778854096628-0266421cac9e',
  'Studio wireless headphones': 'photo-1770292170233-5d9e235ec739',
  'Bluetooth speaker': 'photo-1772683748238-95a91b0f7f43',
  'Oak picture frame': 'photo-1757478558214-5671402e85d9',
  'Full HD webcam': 'photo-1526170375885-4d8ecf77b99f',
  'Tapered stretch chinos': 'photo-1774413511100-54f34b2912e5',
  'Kids quilted gilet': 'photo-1770954179469-de30aec1cb7e',
  'Warm LED desk light': 'photo-1774352863706-292917b7ed38',
  'Kids cotton pyjama set': 'photo-1742541755766-f8495b15bc98',
  'Kids cotton leggings, 2-pack': 'https://images.pexels.com/photos/32069221/pexels-photo-32069221.jpeg?auto=compress&cs=tinysrgb&w=900',
  'Kids rain jacket': 'photo-1791356430448-610505f5a7e3',
  'Heavyweight pocket tee': 'photo-1771919371651-04d6ec4c239a',
  'Water-resistant parka': 'photo-1772521246670-55a8e3d37ca4',
  'Structured knit polo': 'photo-1761167474127-1c6e596ecea6',
  'Cotton poplin shirt': 'photo-1767428827715-e5bad0f9a98e',
  'Oxford button-down shirt': 'photo-1793087160426-b4e6bca37027',
  'Cotton flannel overshirt': 'photo-1551488831-00ddcb6c6bd3',
  'Linen blend camp shirt': 'photo-1539109136881-3be0616acf4b',
  'Merino crew sweater': 'photo-1551232864-3f0890e580d9'
};

export const CATALOG = records.map(([id, originalName, originalPrice, category, originalDescription, imageId, badge, rating, reviews, audience]) => {
  const [name, price, description] = productRefresh[originalName] || [originalName, originalPrice, originalDescription];
  return {
    id,
    _id: id,
    name,
    price,
    category,
    ...(audience ? { audience } : {}),
    description,
    image: freshPhotos[originalName]?.startsWith('http') ? freshPhotos[originalName] : photo(freshPhotos[originalName] || imageId),
    badge,
    rating,
    reviews,
    stock: 12
  };
});

export const productId = (product) => String(product?._id || product?.id || '');
export const formatINR = (value) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
}).format(Number(value) || 0);

export function mergeCatalog(remoteProducts = []) {
  const remoteByName = new Map(remoteProducts.map((item) => [String(item.name || '').trim().toLowerCase(), item]));
  return CATALOG.map((fallback) => {
    const item = remoteByName.get(fallback.name.trim().toLowerCase());
    if (!item) return fallback;
    const id = String(item._id || item.id || fallback.id);
    return {
      ...fallback,
      ...item,
      _id: id,
      id,
      image: item.image || fallback.image,
      rating: fallback.rating,
      reviews: fallback.reviews
    };
  });
}
