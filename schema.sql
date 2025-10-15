-- Create database and table for the assignment
CREATE DATABASE IF NOT EXISTS mahasiswa;
USE mahasiswa;

CREATE TABLE IF NOT EXISTS biodata (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  nim VARCHAR(20) NOT NULL,
  kelas VARCHAR(50) NOT NULL
);

-- Optional seed data
INSERT INTO biodata (nama, nim, kelas) VALUES
('Budi Santoso', '20230140001', 'TI-3A'),
('Siti Aminah', '20230140002', 'TI-3A'),
('Andi Wijaya', '20230140003', 'TI-3B');