import { getAuth } from "@hellocoop/nextjs";
//tbd should be able to import below from @hellocoop/nextjs
import { HelloProvider, ContinueButton, LoggedIn, LoggedOut } from "@hellocoop/nextjs/react";

export default async function() {
  const auth = await getAuth()
  return (
    <HelloProvider auth={auth}>
      <LoggedIn>
        <pre className="text-sm">
          {JSON.stringify(auth, null, 2)}
        </pre>
      </LoggedIn>
      <LoggedOut>
          <ContinueButton theme="aware-static" hover="flare" providerHint={['google','github','gitlab']} />
      </LoggedOut>
    </HelloProvider>
  )
}


// client retrieves auth

// "use client";

// import { useAuth } from "@hellocoop/nextjs";
// // tbd should be able to import below from @hellocoop/nextjs
// import { ContinueButton, LoggedIn, LoggedOut } from "@hellocoop/nextjs";

// export default function() {
//   const { auth } = useAuth()
//   return (
//     <>
//       <LoggedIn>
//           <pre className="text-sm">
//             {JSON.stringify(auth, null, 2)}
//           </pre>
//       </LoggedIn>
//       <LoggedOut>
//           <ContinueButton theme="aware-static" hover="flare" providerHint={['google','github','gitlab']} />
//       </LoggedOut>
//     </>
//   )
// }