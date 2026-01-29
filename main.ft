provider "aws" {
  region = "ap-south-1"
}

resource "null_resource" "deploy_blood_donation_app" {
  provisioner "remote-exec" {
    inline = [
      "sudo apt update",
      "sudo apt install docker.io -y",

      # Stop old containers if running
      "docker stop backend_c || true",
      "docker rm backend_c || true",
      "docker stop frontend_c || true",
      "docker rm frontend_c || true",

      # Run backend
      "docker run -d --restart unless-stopped -p 4000:4000 --name backend_c viduniamashani/project-backend:latest",

      # Run frontend
      "docker run -d --restart unless-stopped -p 3000:3000 --name frontend_c --link backend_c:backend viduniamashani/project-frontend:latest"
    ]

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("/var/lib/jenkins/.ssh/vserver.pem")
      host        = "15.206.66.58"
    }
  }
}
