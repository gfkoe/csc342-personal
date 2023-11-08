1. [Homework5/templates] https://github.ncsu.edu/engr-csc342/csc342-2023Fall-gfkoeb/tree/main/Homework5/templates

1. The main challenge that I faced was trying to figure out how to make a JWT signature 
by hand, and I had to check the crypto node js documentation as well as reading a bit
on JWT.io and how tokens are generated in order to make it work. It was definitely an interesting
challenge but I think reading documentation is a good skill to have.

2. The main security vulnerability is that my API key is just in my TokenMiddleware.js instead
of hidden in an environment variable, so anyone with access to my repo could just
view the file and create their own JWT's to be able to spoof the system.
