import dynamic from 'next/dynamic'
import IssueFormSkeleton from './loading'
import Redirect from '@/app/student/Redirect'

const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  { ssr: false,
    loading: () => <IssueFormSkeleton />
  }
)

const NewIssuePage = () => {
  return (
    <>
    <Redirect />
    <IssueForm />
    </>
  )
}

export default NewIssuePage