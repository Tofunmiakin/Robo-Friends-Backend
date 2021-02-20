// requests user details from the front end and posts them into the database
// stores the password as hash with bcrypt  

// NODE_TLS_REJECT_UNAUTHORIZED='0';

const handleSignup = (req, res, db, bcrypt) => {
  const {email, name, password} =req.body;
  if (!email || !name || !password){
    return res.status(400).json('incorrect form submission');
  }
  const hash = bcrypt.hashSync(password, 10);
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          })
          .catch(err => res.status(400).json('idek mehn'))
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
  .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
  handleSignup: handleSignup
};