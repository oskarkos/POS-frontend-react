import { FC, useEffect, useState } from 'react'
import { axiosRequest } from '../../api/api'
import ContentLayout from '../../layouts/ContentLayout/ContentLayout'
import { DataPropsForm } from '../../types/AuthTypes'
import { activitiesURL } from '../../utils/network'
import { columns } from './../Groups/data/columnData'
import { IActivitiesProps } from './types/UserActivities'

const UserActivities: FC = () => {
  const [fetching, setFetching] = useState(false)
  const [userActivities, setUserActivities] = useState<IActivitiesProps[]>()

  useEffect(() => {
    getUserActivities()
  }, [])

  const getUserActivities = async () => {
    try {
      setFetching(true)
      const response = await axiosRequest<{ results: IActivitiesProps[] }>({
        url: activitiesURL,
        hasAuth: true,
        showError: false,
      })
      if (response) {
        const data = response.data.results
        setUserActivities(data)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setFetching(false)
    }
  }

  return (
    <>
      <ContentLayout
        pageTitle='Actividad de los usuarios'
        dataSource={userActivities as unknown as DataPropsForm[]}
        columns={columns}
        fetching={fetching}
        disabledAddButton={true}
      />
    </>
  )
}
export default UserActivities
