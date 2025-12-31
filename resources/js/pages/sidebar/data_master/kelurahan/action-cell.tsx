import { useEffect, useState } from "react";
import { Village, Subdistrict } from "@/types";
import DeleteDialog from "@/components/custom/delete-dialog";
import EditKelurahan from "./edit-kelurahan";
import { useDeleteWithToast } from "@/hooks/use-delete";

export function ActionCell({
  village,
  subdistricts,
}: {
  village: Village;
  subdistricts: Subdistrict[];
}) {
  const [disableButton, setDisableButton] = useState(false);
  const { deleteItem, isDeleting } = useDeleteWithToast();

  const handleDeleteRow = (v: Village) => {
    deleteItem("villages.destroy", v);
  };

  useEffect(() => {
    setDisableButton(isDeleting);
  }, [isDeleting]);

  return (
    <div className="flex items-center">
      <DeleteDialog
        isProcessing={disableButton}
        onDelete={() => handleDeleteRow(village)}
        title="Hapus Kelurahan"
        key={village.id}
      />
      <EditKelurahan village={village} subdistricts={subdistricts} />
    </div>
  );
}
