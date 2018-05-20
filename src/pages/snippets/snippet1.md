---
path: "/snippets/snippet1"
date: "2017-11-07"
title: "My first Snippet"
tags: ["javascript", "css"]
excerpt: "Hi, This is my first Snippet"
categoryColor: '#FF0000'
category: 'JavaScript'
---

## Snippet 1

Hi, This is my first blog post. Hi, This is my first blog post. Hi, This is my first blog post

Notice we have wrapped our routes in a Switch component and put the login route above our root route. This is because at /login, both Routes will match. View this in the browser at /login.

Next we need to hook things up so that we are taken to our root route after we have a successful login. Update the onSubmit method in src/fe/components/Login/index.js to look like the below.

```
onSubmit(e) {
  e.preventDefault();

  const { username, password } = this.state;
  const { history } = this.props;

  this.setState({ error: false });

  if (!(username === 'george' && password === 'foreman')) {
    return this.setState({ error: true });
  }

  store.set('loggedIn', true);
  history.push('/users');
}
```
