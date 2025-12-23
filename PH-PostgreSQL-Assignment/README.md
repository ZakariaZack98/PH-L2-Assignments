# Queries Explanation — PH-PostgreSQL-Assignment

**Query 1 — JOIN (Bookings with Users and Vehicles)**

SQL

```sql
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
```

- **Purpose:** List bookings along with the customer and vehicle names.
- **When to use:** Use when you need complete booking rows and only want bookings with matching user and vehicle records.

Sample output (example row):

| booking_id | customer_name | vehicle_name | start_date  | end_date    | status    |
|------------|---------------|--------------|-------------|-------------|-----------|
| 101        | Alice Smith   | Toyota Prius | 2025-12-01  | 2025-12-05  | available |


**Query 2 — NOT EXISTS (Vehicles with no bookings)**

SQL

```sql
SELECT * FROM Vehicles v
WHERE NOT EXISTS (
  SELECT 1 
  FROM Bookings b 
  WHERE b.vehicle_id = v.id
);
```

- **Purpose:** Find vehicles that have no bookings (unused vehicles).
- **Behavior:** The correlated subquery checks for any booking referencing the vehicle; `NOT EXISTS` returns true when none found.

Sample output (example rows):

| id | name        | type | status    |
|----|-------------|------|-----------|
| 7  | Bike A   | bike | available |
| 12 | Truck B       | truck  | available |


**Query 3 — WHERE (available cars)**

SQL

```sql
SELECT * FROM Vehicles 
WHERE type = 'car' 
AND status = 'available';
```

- **Purpose:** Return all available vehicles of type `car`.
- **Notes:** Consider parameterizing the `type` and `status` values for reuse.

Sample output:

| id | name         | type | status    |
|----|--------------|------|-----------|
| 3  | Honda Civic  | car  | available |


**Query 4 — GROUP BY and HAVING (vehicles with >2 bookings)**

SQL

```sql
SELECT 
  v.name, 
  COUNT(b.id) AS total_bookings
FROM Bookings b
JOIN Vehicles v ON b.vehicle_id = v.id
GROUP BY v.id, v.name
HAVING COUNT(b.id) > 2;
```

- **Purpose:** Find vehicles that have been booked more than twice and show their booking counts.
- **Notes:** `GROUP BY v.id, v.name` uses `v.id` to make grouping robust if names are not unique.

Sample output:

| name         | total_bookings |
|--------------|----------------|
| Toyota Prius | 5              |


File: `queries.sql` (contains the original queries described above).