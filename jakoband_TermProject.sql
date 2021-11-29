-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 29, 2021 at 12:44 AM
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
(1, 'jakob@fipke.ca', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqYWtvYkBmaXBrZS5jYSIsImlhdCI6MTYzODE3MDkzNiwiZXhwIjoxNjM4Nzc1NzM2fQ.lNTUtmPrBAZfxsyV3YVer39mAOaM_-ZWOatqZdVy4gI', '$2b$10$L8HTBP8z32EcEpqZccxjH.v0IsYKRTfXHxS.vCaMV19KwzFQNUcF2'),
(2, 'hello@hello.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJoZWxsb0BoZWxsby5jb20iLCJpYXQiOjE2MzgxNzE2MTAsImV4cCI6MTYzODc3NjQxMH0.ZzWJ-MLgTrsn4dGOjFMkqDKpz9ZSF_WeVPkzyfxSTNM', '$2b$10$xXP5d9wY111VflaCBn8FnehXTj3xzJxtfc6KwJB4gTKtPVj/nbxyi'),
(3, 'admin@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2MzgxNzE3MjgsImV4cCI6MTYzODc3NjUyOH0.TVvcyrskRFcCl0HqaPe3VzSwcCYXqxEQHIckr8XfdAQ', '$2b$10$DQ3Z3RbHg4XaoGwdl.XXfOxfDhdPIqctYJCfV9fZNV2j3olaDk68C');

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
(2, 'cinnamon', 1);

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `UserIngredient`
--
ALTER TABLE `UserIngredient`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
