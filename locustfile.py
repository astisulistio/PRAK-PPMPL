from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 5)  # tunggu antara 1 hingga 5 detik sebelum request selanjutnya

    # Task 1: Get all users
    @task
    def get_users(self):
        self.client.get("/users")
        
    # Task 2: Get a specific user by ID
    @task
    def get_user_by_id(self):
        user_id = 1  # atau bisa dibuat variabel untuk dynamic ID
        self.client.get(f"/users/{user_id}")

    # Task 3: Create a new user
    @task
    def create_user(self):
        self.client.post("/users", json={"name": "John Doe", "email": "johndoe@example.com"})

    # Task 4: Update a user's information
    @task
    def update_user(self):
        user_id = 1  # gunakan user ID yang sesuai
        self.client.put(f"/users/{user_id}", json={"name": "Jane Doe", "email": "janedoe@example.com"})

    # Task 5: Delete a user
    @task
    def delete_user(self):
        user_id = 1  # gunakan user ID yang sesuai
        self.client.delete(f"/users/{user_id}")

    # Task 6: Get all posts by a specific user
    @task
    def get_user_posts(self):
        user_id = 1  # gunakan user ID yang sesuai
        self.client.get(f"/users/{user_id}/posts")
