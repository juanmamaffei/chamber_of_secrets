# Pending tasks

- Change localhost by environment variables in iniatializers (cors and session).
- Add validations in User model.
- Repair @current_user in all controllers.
- Encrypt data of passwords.
- Strong params everywhere.
- Repair a bug... in dashboard, sometimes the keys not loading. When refreshing, all works fine.
- Keep record users#query in docs.
- Select only email and id in users#query.
- Password history.
- Password generator.
- Authorized user only can read passwords.
- Updating passwords doesn't refresh but create new item (only in frontend). When refreshing page, all works fine.
- Update is a mess... when you introduce one param, another is missing. That it's because the state is not refreshed if you don't change something.
- Confirmation messages in cancel new password and delete password.

## Things to delevop environment

- Test user:
  - Email: juanma@a.com
  - Password: 12346578
  - Other passwords: 123456
