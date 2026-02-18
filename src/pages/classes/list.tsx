import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { useTable } from "@refinedev/react-table";
import { useList } from "@refinedev/core";
import { Subject, User } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ClassDetails } from "@/types";

const ClassesList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedTeacher, setSelectedTeacher] = useState<string>("all");

  const subjectFilters =
    selectedSubject === "all"
      ? []
      : [{ field: "subject", operator: "eq" as const, value: selectedSubject }];
  const teacherFilters =
    selectedTeacher === "all"
      ? []
      : [{ field: "teacher", operator: "eq" as const, value: selectedTeacher }];
  const searchFilters = searchQuery
    ? [
        {
          field: "name",
          operator: "contains" as const,
          value: searchQuery,
        },
      ]
    : [];

  const { result: subjectsResult } = useList<Subject>({
    resource: "subjects",
    pagination: { pageSize: 100 },
  });
  const { result: teachersResult } = useList<User>({
    resource: "users",
    filters: [{ field: "role", operator: "eq", value: "teacher" }],
    pagination: { pageSize: 100 },
  });

  const subjects = subjectsResult?.data ?? [];
  const teachers = teachersResult?.data ?? [];

  const classesTable = useTable<ClassDetails>({
    columns: useMemo<ColumnDef<ClassDetails>[]>(
      () => [
        {
          id: "bannerUrl",
          accessorKey: "bannerUrl",
          size: 80,
          header: () => <p className="column-title ml-2">Banner</p>,
          cell: ({ getValue }) => {
            const url = getValue<string>();
            return url ? (
              <img
                src={url}
                alt="Class banner"
                className="h-10 w-16 rounded object-cover"
              />
            ) : (
              <span className="text-muted-foreground text-xs">—</span>
            );
          },
        },
        {
          id: "name",
          accessorKey: "name",
          size: 200,
          header: () => <p className="column-title ml-2">Class Name</p>,
          cell: ({ getValue }) => <p>{getValue<string>()}</p>,
          filterFn: "includesString",
        },
        {
          id: "status",
          accessorKey: "status",
          size: 100,
          header: () => <p className="column-title ml-2">Status</p>,
          cell: ({ getValue }) => {
            const status = getValue<string>();
            const variant =
              status === "active"
                ? "default"
                : status === "inactive"
                  ? "secondary"
                  : "outline";
            return (
              <Badge variant={variant as "default" | "secondary" | "outline"}>
                {status ?? "—"}
              </Badge>
            );
          },
        },
        {
          id: "subject",
          accessorFn: (row) => row.subject?.name,
          size: 180,
          header: () => <p className="column-title ml-2">Subject</p>,
          cell: ({ getValue }) => (
            <span className="text-foreground">{getValue<string>() ?? "—"}</span>
          ),
        },
        {
          id: "teacher",
          accessorFn: (row) => row.teacher?.name,
          size: 180,
          header: () => <p className="column-title ml-2">Teacher</p>,
          cell: ({ getValue }) => (
            <span className="text-foreground">{getValue<string>() ?? "—"}</span>
          ),
        },
        {
          id: "capacity",
          accessorKey: "capacity",
          size: 80,
          header: () => <p className="column-title ml-2">Capacity</p>,
          cell: ({ getValue }) => (
            <span className="text-foreground">{getValue<number>() ?? "—"}</span>
          ),
        },
      ],
      []
    ),
    refineCoreProps: {
      resource: "classes",
      pagination: { pageSize: 10, mode: "server" },
      filters: {
        permanent: [
          ...subjectFilters,
          ...teacherFilters,
          ...searchFilters,
        ],
      },
      sorters: {
        initial: [{ field: "createdAt", order: "desc" }],
      },
    },
  });

  return (
    <ListView>
      <Breadcrumb />

      <h1 className="page-title">Classes</h1>
      <div>
        <p>Quick access to essential metrics and management tools</p>

        <div className="actions-row">
          <div className="search-field">
            <Search className="search-icon" />
            <Input
              type="text"
              placeholder="Search by class name.."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Select
              value={selectedSubject}
              onValueChange={setSelectedSubject}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.name}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedTeacher}
              onValueChange={setSelectedTeacher}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by teacher" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teachers</SelectItem>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.name}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <CreateButton resource="classes" />
          </div>
        </div>
      </div>
      <DataTable table={classesTable} />
    </ListView>
  );
};

export default ClassesList;
