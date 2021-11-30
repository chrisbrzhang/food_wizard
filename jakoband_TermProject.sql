-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 29, 2021 at 11:57 PM
-- Server version: 10.3.31-MariaDB-cll-lve
-- PHP Version: 7.3.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jakoband_TermProject`
--

-- --------------------------------------------------------

--
-- Table structure for table `Instruction`
--

CREATE TABLE `Instruction` (
  `Id` int(11) NOT NULL,
  `Step` int(11) NOT NULL,
  `Title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Details` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `RecipeId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Instruction`
--

INSERT INTO `Instruction` (`Id`, `Step`, `Title`, `Details`, `RecipeId`) VALUES
(1, 1, 'Heat the tortillas until air pockets form', 'Heat a large skillet (cast iron works great) on medium high heat. Add a small amount of oil (about 1/2 teaspoon) and spread it around the bottom of the pan with a spatula (you could use butter as well).\n\nTake one large flour tortilla and place it in the pan. Flip the tortilla over a few times, 10 seconds between flips. Air pockets should begin to form within the tortilla.', 1),
(2, 2, 'Add cheese and other ingredients', 'When pockets of air begin to form, take a handful of grated cheese, sprinkle over the top of the tortilla, making sure that the cheese does not land on the pan itself.\n\nAdd whatever additional ingredients you choose - green onion, sliced mushrooms, olives, tomatoes, etc. If you would like your quesadilla to be a chicken quesadilla, add some diced cooked chicken.\n\nTake care not to layer on the ingredients too thickly - this is a quesadilla, not a quiche!', 1),
(3, 3, 'Lower heat and cover pan', 'Reduce the heat to low and cover the pan. The pan should be hot enough by now to have plenty of residual heat to melt the cheese and brown the tortilla. If the quesadilla begins to smoke too much, remove from the heat.\n\nAfter a minute, check to see if the cheese is melted. If not, return the cover and keep checking every minute until the cheese is melted.', 1),
(4, 4, 'Fold tortilla over', 'When the cheese is sufficiently melted, use a spatula to lift up one side of the quesadilla and flip over the other side, as if you were making an omelette.\n\nThe tortilla should by now be browned slightly. If it is not browned, turn the heat up to high and flip the quesadilla over every 10 seconds or so until it gets browned.', 1),
(5, 5, 'Remove quesadilla from pan and cut into wedges', 'To make the lettuce to accompany the quesadilla, thinly slice some iceberg lettuce. Sprinkle some cider vinegar on it and some salt.\n\nServe with the lettuce, salsa, sour cream, and guacamole.', 1),
(6, 1, 'Preheat the oven and prep the pan', 'Preheat the oven to 350°F. Spray or grease a 4 1/2 x8 1/2-inch loaf pan very well.', 2),
(7, 2, 'Make the batter', 'Mash the bananas in a mixing bowl using a fork. Whisk in the melted butter, milk, egg, and vanilla. Mix in the sugar.\n\nIn another mixing bowl, using the hand mixer (or a whisk), beat peanut butter until smooth. Beat this into the banana mixture. Scrape the bowl down and beat in the baking soda, salt, and cinnamon.', 2),
(8, 3, 'Fold in the flour and chocolate chips', 'Fold in the flour until completely combined, followed by the chocolate chips.', 2),
(9, 4, 'Bake the loaf', 'Spread the batter in the prepared pan and bake on the center rack of the oven for 55 to 60 minutes, or until the bread is deeply golden and a toothpick inserted in the center comes out clean.', 2),
(10, 5, 'Cool the loaf', 'Remove the bread from the oven and place on a rack to cool completely before turning out.', 2),
(11, 6, 'Enjoy!', 'Store the leftover bread wrapped well in plastic at room temperature for 3 days. Leftovers are great toasted lightly in a pan with butter.', 2),
(12, 1, 'Char the onions and ginger', 'Turn the oven broiler to high, and place the baking rack about 8 inches away from the heating elements.  Place the onion and ginger cut-side-up on a baking sheet, and brush with a bit of oil.  Broil for about 7-10 minutes, until the tops of the onion and ginger are slightly charred.  Remove and set aside.', 3),
(13, 2, 'Make the broth', 'Meanwhile, heat the anise, cloves, cinnamon, cardamom and coriander to a large stockpot over medium-high heat for about 3 minutes until fragrant.  Add in the charred onion, ginger, stock, and stir to combine.  Continue cooking until the broth reaches a simmer.  Then reduce heat to medium-low, cover with a lid, and continue to simmer for at least 30 minutes.  Strain out (and discard) the onions, ginger and spices.  Stir in the fish sauce and sweetener into the hot broth.  Then finally, taste and ', 3),
(14, 3, 'Prep the noodles', 'Meanwhile, as your broth is simmering, cook the noodles separately al dente according to the package instructions.  Drain in a strainer, then briefly rinse the noodles with cold water to prevent them from continuing to cook.  (I also recommend tossing the noodles with a drizzle of oil — such as sesame oil — to prevent them from sticking.)', 3),
(15, 4, 'Assemble', 'Now the fun part!  Add a handful of noodles to each individual serving bowl.  Portion the steak between each serving bowl.  Then ladle the still-simmering hot broth into the serving bowls, being sure to submerge the steak completely so that it gets cooked*.  Top each bowl with lots and lots of garnishes, and finish with a squeeze of lime juice.', 3),
(16, 5, 'Serve immediately', 'Encourage everyone to stir the garnishes into the soup so that they can flavor the broth, also adding in additional extra sauces if desired.', 3);

-- --------------------------------------------------------

--
-- Table structure for table `Recipe`
--

CREATE TABLE `Recipe` (
  `Id` int(11) NOT NULL,
  `Title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Recipe`
--

INSERT INTO `Recipe` (`Id`, `Title`, `Description`) VALUES
(1, 'Quesadilla', 'Here\'s how to make classic Mexican and Tex Mex cheese quesadillas! Just toasted tortillas with melted cheese, your favorite, and toppings.'),
(2, 'Peanut Butter Chocolate Chip Banana Bread', 'Oooh, yes! This Peanut Butter Chocolate Chip Banana Bread is the best of all possible worlds! This riff on classic Banana Bread is so good, the whole loaf will be gone before you know it.'),
(3, 'Pho - Vietnamese Noodle Soup', 'This delicious homemade pho recipe is inspired by the Vietnamese soup we all know and love, yet made with a few time-saving shortcuts.');

-- --------------------------------------------------------

--
-- Table structure for table `RecipeIngredient`
--

CREATE TABLE `RecipeIngredient` (
  `Id` int(11) NOT NULL,
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Optional` tinyint(1) NOT NULL DEFAULT 0,
  `Amount` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `Description` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `RecipeId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `RecipeIngredient`
--

INSERT INTO `RecipeIngredient` (`Id`, `Name`, `Optional`, `Amount`, `Description`, `RecipeId`) VALUES
(1, 'Large flour tortillas', 0, '', '', 1),
(2, 'Grated cheese - either mild or sharp cheddar, or Monterey Jack', 0, '', '', 1),
(3, 'Olive oil or butter', 0, '', '', 1),
(4, 'Sliced mushrooms', 1, '', '', 1),
(5, 'Green onions', 1, '', '', 1),
(6, 'Black olives, sliced', 1, '', '', 1),
(7, 'Fresh tomatoes, diced', 1, '', '', 1),
(8, 'Chicken pieces', 1, '', '', 1),
(9, 'Avocado', 1, '', '', 1),
(10, 'Lettuce', 1, '', '', 1),
(11, 'Apple cider vinegar', 1, '', '', 1),
(12, 'Salt', 1, '', '', 1),
(13, 'very ripe bananas, peeled', 0, '2 to 3', '', 2),
(14, 'melted unsalted butter', 0, '1/3 cup (74g)', '', 2),
(15, 'milk', 0, '1/2 cup', 'whole, 2 percent or even a nut milk works', 2),
(16, 'large egg', 0, '1', '', 2),
(17, 'vanilla extract', 0, '1 teaspoon', '', 2),
(18, 'sugar', 0, '1 cup (200g)', '', 2),
(19, 'creamy peanut butter', 0, '1/2 cup (113g)', '', 2),
(20, 'baking soda', 0, '1/2 teaspoon', '', 2),
(21, 'kosher salt', 0, 'Pinch', '', 2),
(22, 'cinnamon', 1, '1/2 teaspoon', '', 2),
(23, 'all-purpose flour', 0, '1 1/2 cups (191g)', '', 2),
(24, 'chocolate chips', 0, '3/4 cup (143g)', '', 2),
(25, 'large white onion, peeled and halved', 0, '1', '', 3),
(26, 'fresh ginger, halved lengthwise', 0, '3-inch piece', '', 3),
(27, 'star anise', 0, '5', '', 3),
(28, 'whole cloves', 0, '4', '', 3),
(29, 'cinnamon sticks', 0, '3 (3-inch)', '', 3),
(30, 'cardamom pods', 0, '2', '', 3),
(31, 'whole coriander seeds', 0, '1 tablespoon', '', 3),
(32, 'cardamom pods', 0, '2', '', 3),
(33, 'good-quality beef stock (or chicken or vegetable stock)', 0, '8 cups', '', 3),
(34, 'brown sugar', 0, '1 tablespoon', '', 3),
(35, 'fish sauce', 0, '2 teaspoons', '', 3),
(36, 'fine sea salt', 0, 'to taste', '', 3),
(37, 'raw steak, very thinly sliced', 0, '8 ounces', '', 3),
(38, 'uncooked thin rice noodles', 0, '7 ounces', '', 3),
(39, 'garnishes', 0, '1 tablespoon', 'fresh herbs (cilantro, mint, and/or Thai basil), bean sprouts, lime wedges, thinly-sliced chiles (Thai bird chiles or jalapeños), thinly-sliced onions (green onions or white onions), sauces (hoisin an', 3);

-- --------------------------------------------------------

--
-- Table structure for table `SavedRecipe`
--

CREATE TABLE `SavedRecipe` (
  `Id` int(11) NOT NULL,
  `RecipeId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `SavedRecipe`
--

INSERT INTO `SavedRecipe` (`Id`, `RecipeId`, `UserId`) VALUES
(1, 1, 4),
(2, 3, 4),
(3, 2, 6),
(4, 2, 8),
(5, 1, 8),
(6, 1, 13);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `Id` int(11) NOT NULL,
  `Email` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Token` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`Id`, `Email`, `Token`, `Password`) VALUES
(1, 'jakob@fipke.ca', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqYWtvYkBmaXBrZS5jYSIsImlhdCI6MTYzODIyMjI0MCwiZXhwIjoxNjM4ODI3MDQwfQ.9pRnUbKMgf3NC7cwSqAG6LWEB1pZBJMMzF_FXjRSKk0', '$2b$10$bSi79DBqLG5b71f3nZB9vOEEthcK1lPDZol7vGmmbVwOqtL/rNsl2'),
(2, 'hello@hello.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJoZWxsb0BoZWxsby5jb20iLCJpYXQiOjE2MzgxNzIwOTEsImV4cCI6MTYzODc3Njg5MX0.3nBGGO43rlZJ2upS8TJeAoebZSwnUsMj8_Xy2no8mLk', '$2b$10$xXP5d9wY111VflaCBn8FnehXTj3xzJxtfc6KwJB4gTKtPVj/nbxyi'),
(3, 'admin@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2MzgyNTQ4NzIsImV4cCI6MTYzODg1OTY3Mn0.AWNu6LTwszFh1w7cBgFplIiG4JnlKbZHZCkJb_GmVRk', '$2b$10$DQ3Z3RbHg4XaoGwdl.XXfOxfDhdPIqctYJCfV9fZNV2j3olaDk68C'),
(4, 'bobby@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJib2JieUBnbWFpbC5jb20iLCJpYXQiOjE2MzgxNzMwMzIsImV4cCI6MTYzODc3NzgzMn0.GG4Mj-8vJvghU4M3vuJ0ixsfNy62WWrkzaH_ntZfxPM', '$2b$10$zhWYN1ADBuSPhQf7JhwcOuHEnjAcdZRmk/LlgOC2NmXpxRgo38gD2'),
(5, 'b@b.b', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiQGIuYiIsImlhdCI6MTYzODE3MjY5MywiZXhwIjoxNjM4Nzc3NDkzfQ.aOIuBTZ_P_pfz6x58jfWthXL8JPNfutkMzNQgLYrdbo', '$2b$10$we6p6MFP7xnUrtxAmLI/H.k0xmYnZP2idMHWP1pD1jkfEkGDD1ZVy'),
(6, 'barneysmom@fuckyou.ca', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYXJuZXlzbW9tQGZ1Y2t5b3UuY2EiLCJpYXQiOjE2MzgxNzM3NjYsImV4cCI6MTYzODc3ODU2Nn0.5s9KAmiUODryNboBmleGEOcJiKcDP18iDcLOqvDmHZI', '$2b$10$/GuEr1D9e7eweMnS57F2mOscFkBJ15PgwXwIJqKmP2H9r/h8nxncS'),
(7, 'test@test.ca', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY2EiLCJpYXQiOjE2MzgxNzc0NDMsImV4cCI6MTYzODc4MjI0M30.c6RWqaaW835OgY1jpr2lVbJiyrJVFwR9kzFnACPRTaU', '$2b$10$iPCt/UrK5Vjvn2z8ceoL.udE.FixoLVJVLtnxX6.8Q68X/d9u1u22'),
(8, 'a@a.a', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhQGEuYSIsImlhdCI6MTYzODE3NDE3MiwiZXhwIjoxNjM4Nzc4OTcyfQ.4ZpXp1woPQcK_TsnqK8cRwbiojsvX7oZLzgu8MTiozM', '$2b$10$Yr858iZVyuvDshWQ/x/d4ueG3Lg0xcXk9AtAM0Cx6qYMRdhh9Q/1m'),
(9, 'test@mail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QG1haWwuY29tIiwiaWF0IjoxNjM4MTc2MjA0LCJleHAiOjE2Mzg3ODEwMDR9._rD1zJdYcA6AnpuUIgRzkcMTNOEAkezKrsk8p53_Q_s', '$2b$10$d2HchjqsYtKMpWQFFdR.sOWhCr0lx3xNW6bzgklvKKhFaWcqzStYW'),
(10, 'a@a.ama', NULL, '$2b$10$7eoyCzQ5u3ww/ZLQJOyH6uP.I3BC2kYCeXLwknSva.SVrIjuKHD/q'),
(11, 'abc@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYmNAZ21haWwuY29tIiwiaWF0IjoxNjM4MjE4ODg4LCJleHAiOjE2Mzg4MjM2ODh9.twHNXRtNky5JyvnCPxxrrZpcKkgtgsUW3ykFehOjCs0', 'undefined'),
(12, 'abcd@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYmNkQGdtYWlsLmNvbSIsImlhdCI6MTYzODIxODkzOSwiZXhwIjoxNjM4ODIzNzM5fQ.1lYbm6ZleMQ2st8R6MXVvInEoGMoql55vsnmrlCFdbA', '$2b$10$jNjSh9Au2pMeJdTnTq1mteZoTbs6/9T4RgzcR3M5j/.vKTsieLTgC'),
(13, 'bobby1@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJib2JieTFAZ21haWwuY29tIiwiaWF0IjoxNjM4MjE5Mjg3LCJleHAiOjE2Mzg4MjQwODd9.fKnY7_gGwGKVaWawFeROayZgZTByRcV5EnsaAEkqwME', 'undefined'),
(14, 'hello@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJoZWxsb0BnbWFpbC5jb20iLCJpYXQiOjE2MzgyMTk2ODEsImV4cCI6MTYzODgyNDQ4MX0.B_J8uua1oHZ3839gRN_UdM7NUflCMevETiZYktaZ85k', 'undefined'),
(15, 'jakob@taze.ca', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqYWtvYkB0YXplLmNhIiwiaWF0IjoxNjM4MjIxODAzLCJleHAiOjE2Mzg4MjY2MDN9.HTtyqyILrmXeq4gRJHpJ7AagN4J04LkmJLJkocPS720', 'undefined'),
(16, 'c@c.c', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjQGMuYyIsImlhdCI6MTYzODI0MDg0MSwiZXhwIjoxNjM4ODQ1NjQxfQ.lZyobb1zgggoBTi9KO8Mn0gFsXgwhA1SquZsd1QWhNY', '$2b$10$Yi4OJ/DvKhYQeOha.AhxhOOP716wTE3tNWmHlEEtIgYxbWas6Ui7.'),
(17, 'francis@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmcmFuY2lzQGdtYWlsLmNvbSIsImlhdCI6MTYzODI0MjAwNSwiZXhwIjoxNjM4ODQ2ODA1fQ._7xaBg8ZKELCw6MrvZqkSlDLw4Z8p2uRGvsvrov37Mk', '$2b$10$CQ1XIwABuP1Bbw7dzc/EVu53Fy96/VixET3lBPQQ9E4AKwLDKkS4a'),
(18, 'new@jakob.ca', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJuZXdAamFrb2IuY2EiLCJpYXQiOjE2MzgyNTUyNzcsImV4cCI6MTYzODg2MDA3N30.387gUNBYYPSNouLeA8crwE9_yVRSiThSva0t6Ph6S8o', '$2b$10$ao./pd/EzSN.rE9P8TCEPe35DIwXYFWA5.uCFcCuE7KGE4YVME5tm');

-- --------------------------------------------------------

--
-- Table structure for table `UserIngredient`
--

CREATE TABLE `UserIngredient` (
  `Id` int(11) NOT NULL,
  `Name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `UserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `UserIngredient`
--

INSERT INTO `UserIngredient` (`Id`, `Name`, `UserId`) VALUES
(1, 'banana', 1),
(2, 'cinnamon', 1),
(3, 'chicken', 4),
(4, 'bread', 4),
(5, 'chicken', 1),
(6, 'bacon', 4),
(7, 'cheese', 4),
(8, 'egg', 6),
(9, 'flour', 7),
(10, 'egg', 7),
(11, 'flour', 8),
(12, 'egg', 8),
(13, 'flour', 7),
(14, 'egg', 7),
(15, 'SELECT *', 7),
(16, 'flour', 7),
(17, 'egg', 7),
(18, 'SELECT *', 7),
(19, 'SELECT * FROM Users WHERE UserId = 105 OR 1=1;', 7),
(20, '&lt;b&gt;Hello&lt;/b&gt;', 8),
(21, 'water', 7),
(22, '&lt;b&gt;Hello&lt;/b&gt;', 8),
(23, 'pasta', 8),
(24, '&lt;b&gt;Hello&lt;/b&gt;', 8),
(25, 'pasta', 8),
(26, '&lt;b&gt;Hello&lt;/b&gt;', 8),
(27, 'pasta', 8),
(28, '??????????????????????????????????????????????????', 8),
(29, '??????????????????????????????????????????????????', 8),
(30, '10; SELECT * FROM users --', 8),
(31, '10; SELECT * FROM users --', 8),
(32, 'chicken', 1),
(33, 'carrot', 9),
(34, 'Test', 7),
(35, 'asdf', 11),
(36, 'asdf', 11),
(37, 'lololo', 11),
(38, 'af', 11),
(39, 'b', 11),
(40, 'c', 11),
(41, 'chicken', 13),
(42, 'bacon', 13),
(43, 'bacon', 14),
(44, 'cheese', 14),
(45, 'butter', 18);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Instruction`
--
ALTER TABLE `Instruction`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `RecipeId` (`RecipeId`);

--
-- Indexes for table `Recipe`
--
ALTER TABLE `Recipe`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `RecipeIngredient`
--
ALTER TABLE `RecipeIngredient`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `RecipeId` (`RecipeId`);

--
-- Indexes for table `SavedRecipe`
--
ALTER TABLE `SavedRecipe`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `RecipeId` (`RecipeId`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `UserIngredient`
--
ALTER TABLE `UserIngredient`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `UserId` (`UserId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Instruction`
--
ALTER TABLE `Instruction`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `Recipe`
--
ALTER TABLE `Recipe`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `RecipeIngredient`
--
ALTER TABLE `RecipeIngredient`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `SavedRecipe`
--
ALTER TABLE `SavedRecipe`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `UserIngredient`
--
ALTER TABLE `UserIngredient`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Instruction`
--
ALTER TABLE `Instruction`
  ADD CONSTRAINT `Instruction_ibfk_1` FOREIGN KEY (`RecipeId`) REFERENCES `Recipe` (`Id`);

--
-- Constraints for table `RecipeIngredient`
--
ALTER TABLE `RecipeIngredient`
  ADD CONSTRAINT `RecipeIngredient_ibfk_1` FOREIGN KEY (`RecipeId`) REFERENCES `Recipe` (`Id`);

--
-- Constraints for table `SavedRecipe`
--
ALTER TABLE `SavedRecipe`
  ADD CONSTRAINT `SavedRecipe_ibfk_1` FOREIGN KEY (`RecipeId`) REFERENCES `Recipe` (`Id`),
  ADD CONSTRAINT `SavedRecipe_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`);

--
-- Constraints for table `UserIngredient`
--
ALTER TABLE `UserIngredient`
  ADD CONSTRAINT `UserIngredient_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
