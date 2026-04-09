resource "aws_instance" "movie-client-ec2-server" {
  ami                         = "ami-01b14b7ad41e17ba4"
  instance_type               = "m7i-flex.large"
  subnet_id                   = aws_subnet.movie-client-subnet.id
  vpc_security_group_ids      = [aws_security_group.movie-client-sg.id]
  key_name                    = "jay"
  associate_public_ip_address = true

  tags = {
    Name = "movie-client-ec2-server"
  }
}