// export default function UserProfile({ params }: any) {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <h1>Profile</h1>
//       <hr />
//       <p className="text-4xl">
//         Profile Page
//         <span className="p-2 ml-2 rounded bg-orange-500 text-black">
//           {params.id}
//         </span>
//       </p>
//     </div>
//   )
// }

interface UserProfileProps {
  params: Promise<{ id: string }>
}

export default async function UserProfile({ params }: UserProfileProps) {
  const { id } = await params
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile Page
        <span className="p-2 ml-2 rounded bg-orange-500 text-black">
          {id}
        </span>
      </p>
    </div>
  )
}
