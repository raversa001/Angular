-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  Dim 15 jan. 2023 à 01:33
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `angular`
--

-- --------------------------------------------------------

--
-- Structure de la table `assignments`
--

DROP TABLE IF EXISTS `assignments`;
CREATE TABLE IF NOT EXISTS `assignments` (
  `assignmentId` int(11) NOT NULL AUTO_INCREMENT,
  `giverId` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  `subjectId` int(11) NOT NULL,
  `assignedTime` int(11) NOT NULL,
  `givenTime` int(11) NOT NULL,
  PRIMARY KEY (`assignmentId`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `assignments`
--

INSERT INTO `assignments` (`assignmentId`, `giverId`, `studentId`, `subjectId`, `assignedTime`, `givenTime`) VALUES
(1, 1, 1, 1, 1673736656, 1296000);

-- --------------------------------------------------------

--
-- Structure de la table `students`
--

DROP TABLE IF EXISTS `students`;
CREATE TABLE IF NOT EXISTS `students` (
  `studentId` int(11) NOT NULL AUTO_INCREMENT,
  `studentFN` varchar(64) NOT NULL,
  `studentLN` varchar(64) NOT NULL,
  PRIMARY KEY (`studentId`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `students`
--

INSERT INTO `students` (`studentId`, `studentFN`, `studentLN`) VALUES
(1, 'Richard', 'Aversa'),
(2, 'Jarod', 'Acloque');

-- --------------------------------------------------------

--
-- Structure de la table `students_teachers`
--

DROP TABLE IF EXISTS `students_teachers`;
CREATE TABLE IF NOT EXISTS `students_teachers` (
  `studentId` int(11) NOT NULL,
  `teacherId` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `students_teachers`
--

INSERT INTO `students_teachers` (`studentId`, `teacherId`) VALUES
(1, 1),
(2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
CREATE TABLE IF NOT EXISTS `subjects` (
  `subjectId` int(11) NOT NULL AUTO_INCREMENT,
  `subjectName` varchar(64) NOT NULL,
  PRIMARY KEY (`subjectId`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `subjects`
--

INSERT INTO `subjects` (`subjectId`, `subjectName`) VALUES
(1, 'Maths'),
(2, 'EPS'),
(3, 'Français'),
(4, 'Web');

-- --------------------------------------------------------

--
-- Structure de la table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
CREATE TABLE IF NOT EXISTS `teachers` (
  `teacherId` int(11) NOT NULL AUTO_INCREMENT,
  `teacherFN` varchar(64) NOT NULL,
  `teacherLN` varchar(64) NOT NULL,
  PRIMARY KEY (`teacherId`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `teachers`
--

INSERT INTO `teachers` (`teacherId`, `teacherFN`, `teacherLN`) VALUES
(1, 'Michel', 'Buffa');

-- --------------------------------------------------------

--
-- Structure de la table `teachers_subjects`
--

DROP TABLE IF EXISTS `teachers_subjects`;
CREATE TABLE IF NOT EXISTS `teachers_subjects` (
  `teacherId` int(11) NOT NULL,
  `subjectId` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `teachers_subjects`
--

INSERT INTO `teachers_subjects` (`teacherId`, `subjectId`) VALUES
(1, 4);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
