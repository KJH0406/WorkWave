"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

import { RiAddCircleFill } from "react-icons/ri"

import { useGetProjects } from "@/features/projects/api/use-get-projects"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project.modal"
import { ProjectThumbnail } from "@/features/projects/components/project-thumbnail"

// 프로젝트 컴포넌트
export const Projects = () => {
  const pathname = usePathname()
  // 현재 워크스페이스 ID 가져오기
  const workspaceId = useWorkspaceId()
  // 프로젝트 목록 가져오기
  const { data } = useGetProjects({ workspaceId })

  const { open } = useCreateProjectModal()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">프로젝트</p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
        />
      </div>
      <div className="flex flex-col gap-1">
        {data?.documents?.map((project) => {
          const href = `/workspaces/${workspaceId}/projects/${project.$id}`
          const isActive = pathname === href

          return (
            <Link href={href} key={project.$id}>
              <div
                className={cn(
                  "flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-75 transition cursor-pointer text-neutral-500",
                  isActive &&
                    "bg-white shadow-sm hover:opacity-100 text-primary"
                )}
              >
                <ProjectThumbnail
                  name={project.name}
                  image={project.imageUrl}
                />
                <span className="truncate">{project.name}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
