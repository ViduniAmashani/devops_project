provider "aws" {
  region = "ap-south-1"
}

resource "null_resource" "deploy_blood_donation_app" {
  provisioner "remote-exec" {
    inline = [
      "docker stop backend_c || true",
      "docker rm backend_c || true",
      "docker stop frontend_c || true",
      "docker rm frontend_c || true",
      "docker run -d --name backend_c viduni2023/project-backend:latest",
      "docker run -d --name frontend_c -p 3000:3000 viduni2023/project-frontend:latest"
    ]
    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("/var/lib/jenkins/.ssh/vserver.pem")  # <-- PEM location on Jenkins server
      host        = "15.206.66.58"
    }
  }
}
