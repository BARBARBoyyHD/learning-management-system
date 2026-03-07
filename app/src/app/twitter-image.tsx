import { ImageResponse } from "next/og";

// Image metadata
export const alt = "Quizizz Clone - Interactive Learning Platform";
export const size = {
  width: 1200,
  height: 600,
};

export const contentType = "image/png";

// Reuse the same image generation as OG
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          backgroundImage: "radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)",
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(#6a25f4 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            opacity: 0.1,
          }}
        />

        {/* Decorative Blurs */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 400,
            height: 400,
            background: "#6a25f4",
            borderRadius: "50%",
            filter: "blur(120px)",
            opacity: 0.2,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            background: "#6a25f4",
            borderRadius: "50%",
            filter: "blur(120px)",
            opacity: 0.15,
          }}
        />

        {/* Content Container */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          {/* Logo Icon */}
          <div
            style={{
              width: 120,
              height: 120,
              background: "linear-gradient(135deg, #6a25f4 0%, #7c3aed 100%)",
              borderRadius: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 20px 60px rgba(106, 37, 244, 0.3)",
            }}
          >
            <span
              style={{
                fontSize: 64,
                color: "white",
              }}
            >
              🚀
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <h1
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: "white",
                letterSpacing: "-0.02em",
                margin: 0,
                textAlign: "center",
              }}
            >
              Quizizz Clone
            </h1>
            <p
              style={{
                fontSize: 32,
                color: "#a78bfa",
                margin: 0,
                fontWeight: 500,
              }}
            >
              Make Learning Fun & Engaging
            </p>
          </div>

          {/* Feature Pills */}
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 16,
            }}
          >
            {[
              "Auto-Grading",
              "5 Question Types",
              "Real-Time Analytics",
              "Free Forever",
            ].map((feature) => (
              <div
                key={feature}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 20px",
                  background: "rgba(106, 37, 244, 0.15)",
                  border: "1px solid rgba(106, 37, 244, 0.3)",
                  borderRadius: 9999,
                }}
              >
                <span
                  style={{
                    fontSize: 20,
                    color: "#c4b5fd",
                  }}
                >
                  ✓
                </span>
                <span
                  style={{
                    fontSize: 20,
                    color: "#e9d5ff",
                    fontWeight: 500,
                  }}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Badge */}
          <div
            style={{
              marginTop: 24,
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 24px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 16,
            }}
          >
            <span
              style={{
                fontSize: 24,
                color: "#94a3b8",
              }}
            >
              Powered by
            </span>
            <span
              style={{
                fontSize: 24,
                color: "#f1f5f9",
                fontWeight: 600,
              }}
            >
              LearnWeb LMS
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
