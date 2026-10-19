import React from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { JobApplicationDTO, JobStatus } from '@shared/types';
import { STATUS_STYLE } from '../constants/statusConfig';
import { KanbanCard } from './KanbanCard';
import { Plus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface KanbanBoardProps {
  jobs: JobApplicationDTO[];
  onMoveJob: (
    jobId: number,
    toStatus: JobStatus,
    newPositionOrder: number,
    note?: string
  ) => Promise<void>;
  onOpenDetail: (job: JobApplicationDTO) => void;
  onEdit: (job: JobApplicationDTO) => void;
  onDelete: (id: number) => void;
  onAddInColumn: (status: JobStatus) => void;
}

const COLUMNS: JobStatus[] = [
  'WISHLIST',
  'APPLIED',
  'OA_TEST',
  'INTERVIEW_HR',
  'INTERVIEW_USER',
  'OFFERING',
  'ACCEPTED',
  'REJECTED',
  'GHOSTED',
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  jobs,
  onMoveJob,
  onOpenDetail,
  onEdit,
  onDelete,
  onAddInColumn,
}) => {
  const { t } = useLanguage();

  const handleDragEnd = (result: DropResult): void => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const jobId = parseInt(draggableId, 10);
    const toStatus = destination.droppableId as JobStatus;
    const positionOrder = destination.index;

    onMoveJob(jobId, toStatus, positionOrder);
  };

  return (
    <div className="w-full overflow-x-auto pb-6">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 min-w-[3100px] items-start">
          {COLUMNS.map((columnKey) => {
            const style = STATUS_STYLE[columnKey];
            const statusInfo = t.statuses[columnKey];
            // Filter and sort items belonging to this column
            const columnJobs = jobs
              .filter((j) => j.status === columnKey)
              .sort((a, b) => a.positionOrder - b.positionOrder);

            return (
              <div
                key={columnKey}
                className="w-80 flex-shrink-0 flex flex-col rounded-2xl bg-slate-100/90 dark:bg-[#0e1118]/90 border border-slate-200/90 dark:border-zinc-800/80 shadow-sm dark:shadow-lg dark:shadow-black/20 overflow-hidden transition-colors"
              >
                {/* Column Header */}
                <div className={`p-3.5 border-b flex items-center justify-between ${style.columnBorder} bg-slate-50 dark:bg-[#131620]`}>
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${style.dotColor}`} />
                    <h3 className="text-xs font-bold text-slate-800 dark:text-zinc-100 uppercase tracking-wider">
                      {statusInfo.label}
                    </h3>
                    <span className="px-2 py-0.5 text-[11px] font-mono font-semibold rounded-full bg-slate-200 text-slate-700 dark:bg-zinc-800/90 dark:text-zinc-300">
                      {columnJobs.length}
                    </span>
                  </div>

                  <button
                    onClick={() => onAddInColumn(columnKey)}
                    className="p-1 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors"
                    title={`${t.kanban.addTooltip} ${statusInfo.label}`}
                    aria-label={`Tambah ke ${statusInfo.label}`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Droppable Container */}
                <Droppable droppableId={columnKey}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`p-3 flex flex-col gap-3 min-h-[550px] max-h-[calc(100vh-280px)] overflow-y-auto transition-colors ${
                        snapshot.isDraggingOver
                          ? 'bg-indigo-100/50 dark:bg-indigo-950/20 ring-1 ring-indigo-500/30'
                          : ''
                      }`}
                    >
                      {columnJobs.map((job, index) => (
                        <Draggable
                          key={job.id}
                          draggableId={String(job.id)}
                          index={index}
                        >
                          {(dragProvided, dragSnapshot) => (
                            <div
                              ref={dragProvided.innerRef}
                              {...dragProvided.draggableProps}
                              {...dragProvided.dragHandleProps}
                            >
                              <KanbanCard
                                job={job}
                                onOpenDetail={onOpenDetail}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                isDragging={dragSnapshot.isDragging}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}

                      {provided.placeholder}

                      {columnJobs.length === 0 && !snapshot.isDraggingOver && (
                        <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-slate-300 dark:border-zinc-800/80 rounded-xl my-auto">
                          <p className="text-xs text-slate-400 dark:text-zinc-400">
                            {t.kanban.emptyColumn}
                          </p>
                          <button
                            onClick={() => onAddInColumn(columnKey)}
                            className="mt-2 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                          >
                            {t.kanban.addNew}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};
