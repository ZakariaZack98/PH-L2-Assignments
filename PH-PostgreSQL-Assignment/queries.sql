--Query 1: JOIN
SELECT 
  b.id AS booking_id, 
  u.name AS customer_name, 
  v.name AS vehicle_name, 
  b.start_date, 
  b.end_date, 
  b.status
FROM Bookings b
INNER JOIN Users u ON b.user_id = u.id
INNER JOIN Vehicles v ON b.vehicle_id = v.id;

--Query 2: EXISTS
SELECT * FROM Vehicles v
WHERE NOT EXISTS (
  SELECT 1 
  FROM Bookings b 
  WHERE b.vehicle_id = v.id
);

--Query 3: WHERE
SELECT * FROM Vehicles 
WHERE type = 'car' 
AND status = 'available';

--Query 4: GROUP BY and HAVING
SELECT 
  v.name, 
  COUNT(b.id) AS total_bookings
FROM Bookings b
JOIN Vehicles v ON b.vehicle_id = v.id
GROUP BY v.id, v.name
HAVING COUNT(b.id) > 2;