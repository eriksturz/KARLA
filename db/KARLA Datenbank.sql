-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 29. Jan 2024 um 12:13
-- Server-Version: 10.4.25-MariaDB
-- PHP-Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `karla`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `section`
--

CREATE TABLE `section` (
  `sectionID` int(11) NOT NULL,
  `tripID` int(11) NOT NULL,
  `vehicleID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `sectionstart` varchar(200) NOT NULL,
  `sectiongoal` varchar(200) NOT NULL,
  `sectiondistance` decimal(10,2) NOT NULL,
  `sectionemissions` decimal(11,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `trip`
--

CREATE TABLE `trip` (
  `tripID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `distance` decimal(11,2) NOT NULL,
  `startaddress` varchar(50) NOT NULL,
  `goaladdress` varchar(50) NOT NULL,
  `co2_emissions` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `employeeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vehicle`
--

CREATE TABLE `vehicle` (
  `vehicleID` int(11) NOT NULL,
  `co2_output` double NOT NULL,
  `fuel` varchar(40) NOT NULL,
  `vehicle_type` varchar(40) NOT NULL COMMENT 'LOCALTRAIN = distance <= 100km\r\nDISTANCETRAIN = distance > 100km',
  `name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `vehicle`
--

INSERT INTO `vehicle` (`vehicleID`, `co2_output`, `fuel`, `vehicle_type`, `name`) VALUES
(1, 0.1945, 'gas', 'DRIVING', 'Auto'),
(2, 0.0739, 'Electricity', 'LOCALTRAIN', 'Öffentlicher Nahverkehr'),
(3, 0.0461, 'Electricity', 'LONGDISTANCETRAIN', 'Öffentlicher Fernverkehr'),
(5, 0.0152, 'electricity', 'BICYCLING', 'E-Bike'),
(6, 0.2182, 'gas', 'PLANEIN', 'Flug (National)'),
(7, 0.1976, 'gas', 'PLANEOUT', 'Flug (International)'),
(8, 0.0897, 'Electricity', 'ONLINE', 'Videokonferenz'),
(9, 0, 'none', 'WALKING', 'Zu Fuß');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`sectionID`),
  ADD KEY `section_ibfk_1` (`tripID`),
  ADD KEY `section_ibfk_2` (`vehicleID`),
  ADD KEY `userID` (`userID`);

--
-- Indizes für die Tabelle `trip`
--
ALTER TABLE `trip`
  ADD PRIMARY KEY (`tripID`),
  ADD KEY `userID` (`userID`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`);

--
-- Indizes für die Tabelle `vehicle`
--
ALTER TABLE `vehicle`
  ADD PRIMARY KEY (`vehicleID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `section`
--
ALTER TABLE `section`
  MODIFY `sectionID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `trip`
--
ALTER TABLE `trip`
  MODIFY `tripID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `vehicle`
--
ALTER TABLE `vehicle`
  MODIFY `vehicleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `section`
--
ALTER TABLE `section`
  ADD CONSTRAINT `section_ibfk_1` FOREIGN KEY (`tripID`) REFERENCES `trip` (`tripID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `section_ibfk_2` FOREIGN KEY (`vehicleID`) REFERENCES `vehicle` (`vehicleID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `section_ibfk_3` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`);

--
-- Constraints der Tabelle `trip`
--
ALTER TABLE `trip`
  ADD CONSTRAINT `trip_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
