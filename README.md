# NetFlixGPT

Note : Refer the documentation of firebase for all the code of libararies such as /firebase/auth , firebase.js etc. It is simply used from there . No additional logic is required

- First Commit
    - Setup of tailwindCss
    - Planning of Project with features

- Mapping of features
    - Browse page
    - Sign in page
    - Movies page

Added Features or components
- Header
- Routing
- Login Form
- Sign Up Form
- Form validation 
- useRef hook
- Deploying in Production
- Setting up redux store
- Implemented Sign in and Sign out logic
- Moving the useEffect from login to header compononet for fixing bugs
- fixing bug of sign in and sign out page . Protecting the routes by checking the auth status and redirecting to respective page accordingly
- Unsubscribed to the onAuthStateChanged function by using return of useEffect in Header
- Adding hardcoded value in the constants.js
- Registered and made first call on TMDB
- Adding GPT search feature