type JsonResponse = {
  status: (code: number) => { json: (body: unknown) => void };
};

export default function handler(_req: unknown, res: JsonResponse) {
  res.status(200).json({ ok: true, app: "relax-remodel-consulting" });
}
