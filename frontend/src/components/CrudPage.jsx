
import { useMemo, useState } from "react";

export default function CrudPage({ entityKey, db, actions, config }) {
  const [form, setForm] = useState(
    Object.fromEntries(config.fields.map((f) => [f.key, f.type === "checkbox" ? false : ""]))
  );

  const rows = db[entityKey] || [];

  const sourceData = useMemo(() => db, [db]);

  const submit = async () => {
    const payload = { ...form };

    Object.keys(payload).forEach((k) => {
      if (payload[k] === "") payload[k] = null;
    });

    await actions.create(entityKey, payload);
    setForm(Object.fromEntries(config.fields.map((f) => [f.key, f.type === "checkbox" ? false : ""])));
  };

  return (
    <div className="panel">
      <div className="section-title">
        <h2>{config.label}</h2>
      </div>

      <div className="form-grid">
        {config.fields.map((field) => {
          if (field.type === "select") {
            const options = sourceData[field.source] || [];
            return (
              <select
                key={field.key}
                value={form[field.key] ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [field.key]: e.target.value ? Number(e.target.value) : ""
                  })
                }
              >
                <option value="">{field.label}</option>
                {options.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt[field.optionLabel] || `#${opt.id}`}
                  </option>
                ))}
              </select>
            );
          }

          if (field.type === "checkbox") {
            return (
              <label key={field.key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="checkbox"
                  checked={!!form[field.key]}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [field.key]: e.target.checked
                    })
                  }
                />
                {field.label}
              </label>
            );
          }

          return (
            <input
              key={field.key}
              type={field.type || "text"}
              placeholder={field.label}
              value={form[field.key] ?? ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  [field.key]:
                    field.type === "number"
                      ? Number(e.target.value)
                      : e.target.value
                })
              }
            />
          );
        })}

        <div>
          <button className="primary" onClick={submit}>
            Salva
          </button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            {config.fields.map((f) => (
              <th key={f.key}>{f.label}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              {config.fields.map((f) => (
                <td key={f.key}>{String(row[f.key] ?? "")}</td>
              ))}
              <td>
                <button className="danger" onClick={() => actions.remove(entityKey, row.id)}>
                  Elimina
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
``
