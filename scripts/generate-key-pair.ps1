cd .environments/keys
ssh-keygen -t rsa -b 2048 -m PEM -f private.rsa.pem
openssl rsa -in private.rsa.pem -pubout -outform PEM -out public.rsa.pem
